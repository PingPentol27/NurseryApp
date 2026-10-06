# Nursery App – Pembungkus PWA (bisa diinstal di Android, iPhone/iPad, Windows)

Aplikasi Apps Script selalu berjalan di dalam iframe Google, sehingga tidak bisa diinstal langsung.
Folder ini adalah **pembungkus** beralamat tetap (GitHub Pages) yang berisi manifest, service worker,
dan ikon, lalu menampilkan Nursery App di dalamnya. Isi aplikasi tetap diambil langsung dari Apps Script
(tidak pernah di-cache), jadi selalu versi terbaru.

Isi folder: `index.html`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`,
`icon-maskable-512.png`, `apple-touch-icon.png`, `favicon-32.png`, `PANDUAN.md`.

---

## a) Siapkan Apps Script (sekali)
1. Ganti **Code.gs** dan file tampilan (unggah `NurseryApp_index.html` ke Drive, atau tempel `Index.html`).
2. Pilih fungsi **setupSystem** → Jalankan.
3. **Terapkan → Kelola deployment** → ikon pensil **Edit** → Versi: **Versi baru**
   → Jalankan sebagai: **Saya** → Siapa yang memiliki akses: **Siapa saja** → **Terapkan**.
   - JANGAN memilih "Deployment baru": itu membuat link /exec yang berbeda, sehingga pembungkus
     menunjuk ke deployment lama dan membingungkan.
4. Salin **URL aplikasi web** yang berakhiran **/exec**.

## b) Unggah ke GitHub Pages (dari tablet, Chrome)
1. Buka **github.com** → masuk/daftar → tombol **+** (kanan atas) → **New repository**.
2. Repository name: **nurseryapp** → pilih **Public** → **Create repository**.
3. Ketuk **uploading an existing file**. Ekstrak ZIP dulu di HP (aplikasi File → ketuk ZIP → Ekstrak),
   lalu pilih **SEMUA FILE DI DALAM folder** `nurseryapp-pwa` (bukan foldernya) → **Commit changes**.
   - Benar: `index.html` tampil langsung di halaman depan repository.
   - Salah: ada folder `nurseryapp-pwa/` di repository (alamat akan 404).
4. Ketuk file **index.html** → ikon pensil (Edit) → cari baris:
   `const APP_URL = 'https://script.google.com/macros/s/GANTI_DENGAN_ID_DEPLOYMENT/exec';`
   ganti isinya dengan URL /exec Anda → **Commit changes**.
5. **Settings → Pages** → Source: **Deploy from a branch** → Branch: **main** dan **/(root)** → **Save**.
6. Tunggu 1–3 menit. Alamat aplikasi: **https://NAMA-AKUN.github.io/nurseryapp/**

## c) Isi ALAMAT_APLIKASI
Buka spreadsheet Nursery App → sheet **Config** → baris **ALAMAT_APLIKASI** → kolom Nilai:
`https://NAMA-AKUN.github.io/nurseryapp/`. Alamat ini muncul di menu **Install aplikasi** (dengan tombol Salin).
Tidak perlu deploy ulang.

## d) Instal di perangkat
Selalu buka **alamat GitHub Pages**, bukan link /exec.
- **Android (Chrome):** buka alamat → ketuk banner **Pasang** atau menu **Akun → Install aplikasi → Install sekarang**.
  Bila tidak muncul: menu **⋮** → **Instal aplikasi** / **Tambahkan ke layar utama**.
- **iPhone/iPad (Safari, bukan Chrome):** buka alamat → tombol **Bagikan** (kotak + panah ke atas)
  → **Tambahkan ke Layar Utama** → **Tambah**.
- **Windows (Chrome/Edge):** buka alamat → Chrome: ikon instal di kanan kolom alamat → **Instal**.
  Edge: menu **…** → **Aplikasi** → **Instal situs ini sebagai aplikasi**.

## e) Pemecahan masalah
| Gejala | Penyebab umum | Solusi |
|---|---|---|
| Layar ikon kertas sedih / "Maaf, file tidak dapat dibuka" di dalam aplikasi | Akses deployment bukan **Siapa saja**; Code.gs masih lama (tanpa izin tampil di bingkai); atau APP_URL berisi link /exec dari deployment lain | Kelola deployment → Edit → akses **Siapa saja** → Versi baru. Pastikan Code.gs terbaru. Salin ulang URL /exec dari Kelola deployment ke APP_URL |
| Alamat GitHub menampilkan **404** | Pages belum aktif / belum selesai; atau file berada di dalam folder | Settings → Pages → main + /(root), tunggu beberapa menit. Pastikan `index.html` ada di akar repository |
| Tulisan "Alamat aplikasi belum diatur" | APP_URL belum diganti | Edit `index.html`, isi APP_URL dengan link /exec |
| Tombol instal tidak muncul | Membuka link **/exec**, bukan alamat GitHub Pages; atau di iPhone memakai Chrome | Buka `https://NAMA-AKUN.github.io/nurseryapp/`. Di iPhone pakai **Safari** → Bagikan → Tambahkan ke Layar Utama |
| "Tidak ada koneksi" | Internet terputus | Aplikasi terbuka otomatis saat koneksi kembali, atau ketuk Coba lagi |
| Sering diminta masuk ulang di iPhone | Safari membatasi penyimpanan di dalam bingkai | Normal di iOS; masuk ulang seperti biasa |

## f) Memperbarui di kemudian hari
- **Memperbarui Nursery App** (Code.gs / file tampilan): ganti file → **Kelola deployment → Edit → Versi baru**.
  Link /exec tetap sama, jadi pembungkus **tidak perlu diubah**. Pengguna yang sedang membuka aplikasi
  mendapat banner **"Versi baru tersedia – Muat ulang"**.
- **Memperbarui pembungkus** (mis. ganti ikon): unggah file baru ke repository, lalu di `sw.js` naikkan
  `VERSI` (mis. `nurseryapp-pwa-v1` → `nurseryapp-pwa-v2`) → Commit. Aplikasi yang terpasang memperbarui diri otomatis.
