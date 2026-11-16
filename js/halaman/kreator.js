/* Tim 2 / Mahasiswa · Logika layar Profil Kreator */

// 1) Ambil parameter `id` dari URL query string (?id=...)
const id = ambilParameter('id');
const kreator = id ? cariKreator(id) : null;
const wadahApp = document.getElementById('app-kreator');

// 2) Kasus A: ID tidak ada atau kreator tidak ditemukan
if (!kreator) {
  wadahApp.innerHTML = `
    <header class="bilah-atas bilah-atas--tengah">
      <a class="ikon-tombol" href="index.html" id="tombol-kembali" aria-label="Kembali ke Beranda"></a>
      <h1 class="bilah-atas__judul">Profil Kreator</h1>
      <span style="width: 44px;" aria-hidden="true"></span>
    </header>

    <main class="konten">
      <div class="pesan-kosong">
        <div class="pesan-kosong__ikon">
          ${ikon('tentang', 48, 1.5)}
        </div>
        <strong>Kreator tidak ditemukan</strong>
        <p class="teks-isi teks-redup" style="max-width: 320px;">
          Profil kreator yang kamu cari tidak ditemukan atau tautan belum lengkap. Silakan kembali ke Beranda.
        </p>
        <a href="index.html" class="tombol tombol--utama" style="margin-top: var(--jarak-3);">
          ${ikon('kembali', 18)} Kembali ke Beranda
        </a>
      </div>
    </main>
  `;

  pasangTombolKembali('tombol-kembali');
} else {
  // 3) Kasus B: Kreator ditemukan
  document.title = `${kreator.nama} · Galeri Karya STMM`;

  // Ambil karya milik kreator
  const daftarKarya = karyaMilik(kreator.id);
  const jumlahKarya = daftarKarya.length;
  const jumlahKategori = new Set(daftarKarya.map((k) => k.kategori)).size;
  const bergabung = kreator.angkatan;

  // HTML daftar karya dalam grid 2 kolom
  const htmlKarya = daftarKarya.length > 0
    ? `<div class="grid-2">
        ${daftarKarya.map((k) => kartuKarya(k, { tampilkanKreator: false })).join('')}
       </div>`
    : `<p class="teks-redup">Belum ada karya yang diunggah oleh kreator ini.</p>`;

  wadahApp.innerHTML = `
    <!-- Banner Profil Biru Tua -->
    <header class="kreator-hero">
      <div class="bilah-atas bilah-atas--tengah">
        <a class="ikon-tombol" href="index.html" id="tombol-kembali" aria-label="Kembali"></a>
        <h1 class="bilah-atas__judul">Profil Kreator</h1>
        <span style="width: 44px;" aria-hidden="true"></span>
      </div>

      <div class="kreator-hero__badan">
        <div class="kreator-hero__avatar">
          ${aman(inisial(kreator.nama))}
        </div>
        <h2 class="kreator-hero__nama">${aman(kreator.nama)}</h2>
        <span class="kreator-hero__meta">
          ${aman(kreator.prodi)} · Angkatan ${aman(kreator.angkatan)}
        </span>
      </div>
    </header>

    <!-- Kartu Statistik (3 Kotak Melayang) -->
    <div class="kreator-stats">
      <div class="kreator-stat">
        <span class="kreator-stat__angka">${jumlahKarya}</span>
        <span class="kreator-stat__label">Karya</span>
      </div>
      <div class="kreator-stat">
        <span class="kreator-stat__angka">${jumlahKategori}</span>
        <span class="kreator-stat__label">Kategori</span>
      </div>
      <div class="kreator-stat">
        <span class="kreator-stat__angka">${aman(bergabung)}</span>
        <span class="kreator-stat__label">Bergabung</span>
      </div>
    </div>

    <!-- Area Konten Utama -->
    <main class="konten kreator-konten">
      <!-- Tentang Kreator -->
      <section class="bagian">
        <h2 class="judul-bagian">Tentang Kreator</h2>
        <p class="teks-isi">${aman(kreator.bio)}</p>
      </section>

      <!-- Karya Kreator -->
      <section class="bagian">
        <h2 class="judul-bagian">Karya</h2>
        ${htmlKarya}
      </section>
    </main>
  `;

  // Pasang aksi navigasi kembali
  pasangTombolKembali('tombol-kembali');
}
