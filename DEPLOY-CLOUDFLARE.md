# Deploy Cloudflare

Project ini sudah disiapkan untuk **Cloudflare Workers + Static Assets** sehingga perintah berikut dapat digunakan:

```bash
npx wrangler deploy
```

## Cloudflare Build settings

Jika memakai Git integration:

- Framework preset: None
- Build command: `exit 0`
- Build output directory: kosongkan (deployment dilakukan oleh Wrangler)
- Deploy command: `npx wrangler deploy`

## Binding

Agar konfigurasi global/admin bekerja, Worker perlu binding berikut:

- KV namespace: variable `GAME_KV`
- Secret: `ADMIN_TOKEN`

Tanpa `GAME_KV`, halaman game tetap dapat berjalan memakai konfigurasi bawaan. Fitur penyimpanan konfigurasi global di halaman admin membutuhkan binding tersebut.
