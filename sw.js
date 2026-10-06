/* Service worker pembungkus Nursery App.
 * HANYA menyimpan cangkang pembungkus (file di repository ini). Aplikasi Apps Script (script.google.com /
 * googleusercontent.com) TIDAK PERNAH disentuh/di-cache, sehingga selalu tampil versi deployment terbaru.
 * Bila file pembungkus diubah, naikkan VERSI (mis. nurseryapp-pwa-v2) agar perangkat memperbarui diri. */
const VERSI = 'nurseryapp-pwa-v1';
const CANGKANG = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png', './favicon-32.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSI).then(c => c.addAll(CANGKANG)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSI).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;   // Apps Script & domain lain: dibiarkan ke jaringan
  if (req.mode === 'navigate') {   // halaman: jaringan dulu, cadangan dari cache saat offline
    e.respondWith(fetch(req).then(res => { const salin = res.clone(); caches.open(VERSI).then(c => c.put('./index.html', salin)); return res; })
      .catch(() => caches.match('./index.html').then(r => r || caches.match('./'))));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => { if (res.ok) { const salin = res.clone(); caches.open(VERSI).then(c => c.put(req, salin)); } return res; })));
});
