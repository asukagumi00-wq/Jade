# Jade Tile Fortune II — Cloudflare Pages

Versi 2 game ubin mahjong **orisinal** untuk demo koin virtual. Proyek ini bukan
PG SOFT dan tidak menggunakan nama, logo, musik, ilustrasi, maupun aset
`Mahjong Ways 2`.

Tidak tersedia deposit, withdrawal, transaksi taruhan, atau hadiah uang asli.

## Arsitektur

```text
GitHub
  └─ Cloudflare Pages
       ├─ public/                  situs game dan halaman admin
       ├─ functions/api/config.js config publik
       ├─ functions/api/admin/    simpan config global
       └─ Workers KV GAME_KV      penyimpanan config global
```

Saldo pemain tersimpan pada `localStorage` perangkat. Konfigurasi global
tersimpan di Workers KV.

## Fitur versi 2

- Cloudflare Pages + GitHub auto deployment
- 5 reel × 4 baris
- Ways wins dari reel kiri
- Cascading tiles
- Wild
- Scatter dan free spins
- Multiplier cascade
- Auto spin 10
- Saldo koin virtual per perangkat
- Admin page `/admin.html`
- Config global menggunakan Workers KV
- Paksa tepat 3/4/5 scatter untuk mode pengujian
- CSP dan security headers
- Simulator statistik lokal

## 1. Upload ke GitHub

Buat repository kosong, lalu dari folder proyek:

```bash
git init
git add .
git commit -m "Jade Tile Fortune II"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

Jangan mengunggah token admin atau file `.dev.vars`.

## 2. Hubungkan GitHub ke Cloudflare Pages

Di Cloudflare:

1. **Workers & Pages**
2. **Create application**
3. **Pages**
4. **Connect to Git**
5. Pilih repository GitHub
6. Gunakan pengaturan:

```text
Production branch: main
Framework preset: None
Build command: exit 0
Build output directory: public
Root directory: /
```

Deploy pertama tetap dapat berjalan tanpa KV. Game akan memakai config bawaan.

## 3. Buat KV untuk config global

Di Cloudflare dashboard buat Workers KV namespace, misalnya:

```text
jade-tile-fortune-config
```

Pada project Pages:

```text
Settings
→ Bindings
→ Add
→ KV namespace
```

Isi:

```text
Variable name: GAME_KV
KV namespace: jade-tile-fortune-config
```

Binding harus bernama tepat `GAME_KV`.

Setelah menambah binding, lakukan redeploy.

## 4. Buat token admin

Pada Pages project:

```text
Settings
→ Variables and Secrets
→ Add
```

Tambahkan sebagai **Secret**:

```text
Name: ADMIN_TOKEN
Value: token-rahasia-panjang
```

Gunakan token acak yang panjang. Jangan tulis token tersebut di GitHub.

Setelah itu lakukan redeploy.

## 5. Buka admin panel

```text
https://NAMA-PROJECT.pages.dev/admin.html
```

Masukkan `ADMIN_TOKEN`, lalu tekan **Muat Config Global**.

Pengaturan yang dapat diubah:

- Nama game
- Saldo awal
- Nilai bet
- Skala hadiah
- Max win
- Jumlah cascade
- Bobot scatter
- Jumlah free spin
- Mode pengujian tepat 3/4/5 scatter

`Skala hadiah` mengubah seluruh pembayaran tetapi tidak menjamin RTP tertentu.
Uji menggunakan simulator sebelum mengubah nilai.

## 6. Custom domain

Pada project Pages:

```text
Custom domains
→ Set up a domain
```

Masukkan, misalnya:

```text
game.domainkamu.com
```

Jika domain sudah berada di akun Cloudflare yang sama, record DNS biasanya
dibuat otomatis setelah domain dikonfirmasi.

## 7. Jalankan lokal

Instal dependency development:

```bash
npm install
```

Salin:

```bash
cp .dev.vars.example .dev.vars
```

Edit token pada `.dev.vars`, lalu:

```bash
npm run dev
```

Untuk KV lokal, Wrangler membuat penyimpanan development lokal.

## 8. Tes sintaks

```bash
npm run check
```

## 9. Simulator statistik

```bash
npm run simulate
```

Contoh satu juta spin:

```bash
SPINS=1000000 BET=100 npm run simulate
```

Hasil merupakan perkiraan statistik, bukan jaminan hasil per pemain.

## Keterbatasan

- Saldo pemain berada di browser, sehingga pemain dapat mereset data perangkat.
- Sistem ini dibuat untuk demo koin virtual, bukan layanan permainan uang asli.
- KV bersifat eventually consistent; perubahan config global dapat memerlukan
  sedikit waktu untuk terlihat di semua lokasi.
- Admin token harus disimpan sebagai Cloudflare Secret.
