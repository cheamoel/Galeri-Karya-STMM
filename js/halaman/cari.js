/* Tim 2 / Mahasiswa · Logika layar Pencarian Karya */

// 1) Siapkan ikon pada bidang input pencarian
const ikonCari = document.getElementById('ikon-bidang-cari');
if (ikonCari) {
  ikonCari.innerHTML = ikon('cari', 20, 2);
}

// 2) Elemen DOM
const inputCari = document.getElementById('input-cari');
const tombolBersihkan = document.getElementById('tombol-bersihkan');
const wadahChips = document.getElementById('daftar-chip-cari');
const judulStatus = document.getElementById('judul-status-cari');
const wadahHasil = document.getElementById('daftar-hasil-cari');

// 3) State pencarian awal dari parameter URL
let kataKunci = (ambilParameter('q') || '').trim();
let kategoriAktif = (ambilParameter('k') || '').trim();
const idKarya = ambilParameter('id');

if (inputCari && kataKunci) {
  inputCari.value = kataKunci;
  if (tombolBersihkan) tombolBersihkan.style.display = 'flex';
}

// 4) Render deret chip kategori filter
function renderChips() {
  if (!wadahChips) return;
  wadahChips.innerHTML = DAFTAR_KATEGORI.map((nama) => {
    const aktif = kategoriAktif.toLowerCase() === nama.toLowerCase();
    return `
      <button type="button" class="chip chip--garis" data-kategori="${nama}" ${aktif ? 'aria-pressed="true"' : ''}>
        ${nama}
      </button>
    `;
  }).join('');
}

// 5) Logika penyaringan karya
function saringKarya() {
  let hasil = KARYA;

  // Filter berdasarkan kategori yang dipilih
  if (kategoriAktif) {
    hasil = hasil.filter((k) => k.kategori.toLowerCase() === kategoriAktif.toLowerCase());
  }

  // Filter berdasarkan kata kunci judul, nama kreator, genre, atau mata kuliah
  if (kataKunci) {
    const q = kataKunci.toLowerCase();
    hasil = hasil.filter((k) => {
      const kreator = cariKreator(k.kreatorId);
      const namaKreator = kreator ? kreator.nama.toLowerCase() : '';
      const judul = k.judul.toLowerCase();
      const genre = (k.genre || '').toLowerCase();
      const mataKuliah = (k.mataKuliah || '').toLowerCase();

      return (
        judul.includes(q) ||
        namaKreator.includes(q) ||
        genre.includes(q) ||
        mataKuliah.includes(q)
      );
    });
  } else if (idKarya && !kategoriAktif) {
    hasil = hasil.filter((k) => String(k.id) === String(idKarya));
  }

  return hasil;
}

// 6) Render daftar hasil pencarian
function renderHasil() {
  const daftar = saringKarya();

  // Pembaruan judul bagian
  if (judulStatus) {
    if (!kataKunci && !kategoriAktif && !idKarya) {
      judulStatus.textContent = 'Karya terbaru';
    } else {
      judulStatus.textContent = `Hasil pencarian (${daftar.length} karya)`;
    }
  }

  if (!wadahHasil) return;

  if (daftar.length === 0) {
    wadahHasil.innerHTML = `
      <div class="pesan-kosong" style="padding: 48px var(--jarak-4);">
        <div class="pesan-kosong__ikon">
          ${ikon('cari', 44, 1.5)}
        </div>
        <strong>Karya tidak ditemukan</strong>
        <p class="teks-isi teks-redup" style="max-width: 280px;">
          Tidak ada karya yang cocok dengan kata kunci atau filter yang dipilih.
        </p>
      </div>
    `;
  } else {
    wadahHasil.innerHTML = daftar.map((k) => {
      const kreator = cariKreator(k.kreatorId);
      const namaKreator = kreator ? kreator.nama : 'Kreator';
      const isiThumb = k.thumbnail
        ? `<img src="${aman(k.thumbnail)}" alt="" style="width:100%;height:100%;object-fit:cover;">`
        : ikon(k.kategori, 24, 1.8);

      return `
        <a class="baris-karya" href="detail.html?id=${k.id}">
          <div class="baris-karya__thumb" style="${gayaKategori(k.kategori)}">
            ${isiThumb}
          </div>
          <div class="baris-karya__info">
            <span class="baris-karya__judul">${aman(k.judul)}</span>
            <span class="baris-karya__sub">${aman(namaKreator)} · ${aman(k.kategori)}</span>
          </div>
        </a>
      `;
    }).join('');
  }
}

// 7) Event Listeners
if (inputCari) {
  inputCari.addEventListener('input', (e) => {
    kataKunci = e.target.value.trim();
    if (tombolBersihkan) {
      tombolBersihkan.style.display = kataKunci.length > 0 ? 'flex' : 'none';
    }
    renderHasil();
  });
}

if (tombolBersihkan) {
  tombolBersihkan.addEventListener('click', () => {
    if (inputCari) {
      inputCari.value = '';
      inputCari.focus();
    }
    kataKunci = '';
    tombolBersihkan.style.display = 'none';
    renderHasil();
  });
}

if (wadahChips) {
  wadahChips.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;

    const katDipilih = chip.dataset.kategori;
    // Toggle: jika klik kategori yang sama, batalkan filter
    if (kategoriAktif.toLowerCase() === katDipilih.toLowerCase()) {
      kategoriAktif = '';
    } else {
      kategoriAktif = katDipilih;
    }

    renderChips();
    renderHasil();
  });
}

// 8) Inisialisasi awal
renderChips();
renderHasil();
