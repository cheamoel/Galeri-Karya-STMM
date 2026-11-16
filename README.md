# Paket Awal · Galeri Karya STMM

Titik awal tugas individu Pertemuan 10 untuk **semua mahasiswa**. Isinya layar **Beranda** yang sudah jadi
dan sudah memakai format data standar. Mulailah dari **Level 1** di slide Pertemuan 10.

> 💾 Komputer lab memakai Deep Freeze: file hilang saat komputer dimatikan. Setelah Level 1,
> simpan proyekmu di repositori GitHub dan unggah setiap selesai satu level.

> ⚠️ Isi `js/data.js` adalah **data contoh**, bukan karya asli.

## Isi paket

```
index.html             ← layar Beranda (sudah jadi)
css/tokens.css         ← design token
css/style.css          ← komponen: kartu karya, chip, tombol, navigasi bawah
css/halaman/beranda.css
js/data.js             ← data standar: KARYA & KREATOR
js/app.js              ← fungsi bantu: kartuKarya, cariKarya, ambilParameter, bagikanKarya, dll.
js/halaman/beranda.js
assets/logo-stmm.png
```

Tautan di Beranda sudah mengarah ke `detail.html?id=…` dan `kategori.html`, tapi halaman itu
**belum ada**. Membuatnya adalah tugasmu di Level 2 dan Level 3.

## Cara memakai

1. Ekstrak zip ke folder `Documents/galeri-karya-stmm`.
2. Klik dua kali `index.html` untuk melihat Beranda.
3. Buka foldernya di Antigravity sebagai project, lalu lanjutkan ke **Langkah 2** (unggah ke repositori GitHub).

## Pertemuan berikutnya

- **Awal sesi:** repositorimu di github.com → **Code → Download ZIP** → ekstrak → buka di Antigravity.
- **Akhir sesi:** **Add file → Upload files** → seret semua isi folder → **Commit changes**.

## Data yang tersedia (`js/data.js`)

| Variabel | Field |
|---|---|
| `KARYA` | `id, judul, kategori, genre, kreatorId, tahun, durasi, mataKuliah, sinopsis, youtubeId, thumbnail, unggulan` |
| `KREATOR` | `id, nama, prodi, angkatan, bio` |
