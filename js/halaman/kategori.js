/* Tim 2 / Mahasiswa · Logika layar Kategori */

// 1) Daftar chip kategori: 'Semua' + kategori standar dari DAFTAR_KATEGORI
const DAFTAR_SEMUA_KATEGORI = ['Semua', ...DAFTAR_KATEGORI];

// 2) Fungsi untuk menormalkan nama kategori dari parameter URL (?k=...)
function normalisasiKategori(nama) {
  if (!nama) return 'Semua';
  const cocok = DAFTAR_SEMUA_KATEGORI.find(
    (k) => k.toLowerCase() === nama.trim().toLowerCase()
  );
  return cocok || 'Semua';
}

// 3) Status kategori & urutan aktif
let kategoriAktif = normalisasiKategori(ambilParameter('k'));
let urutanAktif = 'terbaru';

const selectUrut = document.getElementById('pilih-urut');
if (selectUrut) {
  urutanAktif = selectUrut.value;
  selectUrut.addEventListener('change', (e) => {
    urutanAktif = e.target.value;
    renderGridDanStatus();
  });
}

// 4) Filter dan urutkan karya berdasarkan status aktif
function ambilKaryaTerfilter() {
  let hasil = KARYA;
  if (kategoriAktif !== 'Semua') {
    hasil = KARYA.filter((k) => k.kategori.toLowerCase() === kategoriAktif.toLowerCase());
  }

  const salinan = [...hasil];
  if (urutanAktif === 'terlama') {
    return salinan.sort((a, b) => a.id - b.id);
  } else if (urutanAktif === 'judul') {
    return salinan.sort((a, b) => a.judul.localeCompare(b.judul, 'id'));
  }
  // Default: 'terbaru' (id terbesar / terbaru)
  return salinan.sort((a, b) => b.id - a.id);
}

// 5) Render deret chip kategori
function renderChips() {
  const wadah = document.getElementById('daftar-chip-kategori');
  if (!wadah) return;

  wadah.innerHTML = DAFTAR_SEMUA_KATEGORI.map((nama) => {
    const aktif = nama === kategoriAktif;
    const href = nama === 'Semua' ? 'kategori.html' : `kategori.html?k=${encodeURIComponent(nama)}`;
    return `
      <a class="chip" href="${href}" data-kategori="${nama}" ${aktif ? 'aria-pressed="true"' : ''}>
        ${nama}
      </a>
    `;
  }).join('');
}

// Tangani klik pada chip untuk pembaruan cepat tanpa reload penuh
const wadahChips = document.getElementById('daftar-chip-kategori');
if (wadahChips) {
  wadahChips.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;

    e.preventDefault();
    const katDipilih = chip.dataset.kategori;
    if (katDipilih === kategoriAktif) return;

    kategoriAktif = katDipilih;
    const url = katDipilih === 'Semua' ? 'kategori.html' : `kategori.html?k=${encodeURIComponent(katDipilih)}`;
    history.pushState(null, '', url);

    renderSemua();
  });
}

// Tangani navigasi kembali/maju peramban (popstate)
window.addEventListener('popstate', () => {
  kategoriAktif = normalisasiKategori(ambilParameter('k'));
  renderSemua();
});

// 6) Render grid kartu karya dan keterangan jumlah
function renderGridDanStatus() {
  const daftar = ambilKaryaTerfilter();
  const teksStatus = document.getElementById('teks-status-karya');
  const grid = document.getElementById('grid-karya');

  if (teksStatus) {
    teksStatus.textContent = `${daftar.length} karya · ${kategoriAktif}`;
  }

  if (!grid) return;

  if (daftar.length === 0) {
    grid.innerHTML = `
      <div class="pesan-kosong" style="grid-column: 1 / -1;">
        <div class="pesan-kosong__ikon">
          ${ikon('Film', 40)}
        </div>
        <strong>Tidak ada karya</strong>
        <p class="teks-isi teks-redup">Belum ada karya dalam kategori ${aman(kategoriAktif)}.</p>
      </div>
    `;
  } else {
    grid.innerHTML = daftar.map((k) => kartuKarya(k)).join('');
  }
}

// 7) Fungsi utama untuk memperbarui seluruh tampilan
function renderSemua() {
  renderChips();
  renderGridDanStatus();
}

// Inisialisasi awal saat halaman dimuat
renderSemua();
