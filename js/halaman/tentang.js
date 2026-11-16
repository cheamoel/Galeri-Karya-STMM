/* Tim 2 / Mahasiswa · Logika layar Tentang Galeri */

// 1) Konten informasi dialog modal
const DATA_MODAL = {
  kebijakan: {
    judul: 'Kebijakan Karya & Hak Cipta',
    isi: `
      Semua karya yang dipublikasikan di Galeri Karya STMM adalah hak cipta dan kekayaan intelektual milik masing-masing mahasiswa pencipta.<br><br>
      Galeri Karya STMM bertindak sebagai media apresiasi, etalase portofolio digital, dan sarana edukatif akademik. Seluruh materi dipublikasikan atas izin kreator yang bersangkutan.
    `
  },
  pengembang: {
    judul: 'Tim Pengembang',
    isi: `
      Aplikasi Galeri Karya STMM dikembangkan oleh mahasiswa program studi STMM (Sekolah Tinggi Multi Media) Yogyakarta dalam rangkaian tugas dan proyek mata kuliah Mobile Computing.<br><br>
      Dibangun menggunakan pendekatan desain sistem modern (Design Tokens) dengan Plus Jakarta Sans, CSS modular, dan JavaScript murni tanpa ketergantungan library luar.
    `
  },
  kontak: {
    judul: 'Kontak & Informasi',
    isi: `
      Ingin mengajukan karya, memberikan masukan, atau berkolaborasi?<br><br>
      <strong>Email:</strong> <a href="mailto:galeri@mmtc.ac.id">galeri@mmtc.ac.id</a><br>
      <strong>Alamat Kampus:</strong> Jl. Magelang Km. 6, Sinduadi, Mlati, Sleman, D.I. Yogyakarta 55284<br>
      <strong>Situs Web:</strong> <a href="https://mmtc.ac.id" target="_blank" rel="noopener">mmtc.ac.id</a>
    `
  }
};

// 2) Elemen DOM modal
const modalLatar = document.getElementById('modal-info');
const modalJudul = document.getElementById('modal-judul');
const modalIsi = document.getElementById('modal-isi');
const modalTutup = document.getElementById('modal-tutup');

function bukaModal(kunci) {
  const data = DATA_MODAL[kunci];
  if (!data || !modalLatar) return;

  modalJudul.textContent = data.judul;
  modalIsi.innerHTML = data.isi;
  modalLatar.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function tutupModal() {
  if (!modalLatar) return;
  modalLatar.style.display = 'none';
  document.body.style.overflow = '';
}

// 3) Event listeners tombol menu baris
document.querySelectorAll('.menu-baris').forEach((tombol) => {
  tombol.addEventListener('click', () => {
    const kunci = tombol.dataset.modal;
    bukaModal(kunci);
  });
});

// Tutup modal via tombol X
if (modalTutup) {
  modalTutup.addEventListener('click', tutupModal);
}

// Tutup modal saat klik area luar dialog
if (modalLatar) {
  modalLatar.addEventListener('click', (e) => {
    if (e.target === modalLatar) {
      tutupModal();
    }
  });
}

// Tutup modal saat tekan tombol Escape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalLatar && modalLatar.style.display === 'flex') {
    tutupModal();
  }
});
