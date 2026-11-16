/* Tim 2 / Mahasiswa · Logika layar Detail Karya */

// 1) Pasang tombol navigasi kembali ke index.html
pasangTombolKembali('tombol-kembali');

// 2) Siapkan tombol bagikan di bilah atas
const tombolBagikanAtas = document.getElementById('tombol-bagikan-atas');
if (tombolBagikanAtas) {
  tombolBagikanAtas.innerHTML = ikon('bagikan', 22);
}

// 3) Ambil parameter `id` dari URL query string (?id=...)
const id = ambilParameter('id');
const karya = id ? cariKarya(id) : null;
const wadahKonten = document.getElementById('konten-detail');

// 4) Kasus A: ID tidak ada atau karya tidak ditemukan
if (!karya) {
  if (tombolBagikanAtas) {
    tombolBagikanAtas.style.display = 'none';
  }

  wadahKonten.innerHTML = `
    <div class="pesan-kosong">
      <div class="pesan-kosong__ikon">
        ${ikon('Film', 48, 1.5)}
      </div>
      <strong>Karya tidak ditemukan</strong>
      <p class="teks-isi teks-redup" style="max-width: 320px;">
        Karya yang kamu cari tidak ditemukan atau tautan belum lengkap. Silakan pilih karya lain di Beranda.
      </p>
      <a href="index.html" class="tombol tombol--utama" style="margin-top: var(--jarak-3);">
        ${ikon('kembali', 18)} Kembali ke Beranda
      </a>
    </div>
  `;
} else {
  // 5) Kasus B: Karya ditemukan
  document.title = `${karya.judul} · Galeri Karya STMM`;

  const kreator = cariKreator(karya.kreatorId) || {
    id: karya.kreatorId || '',
    nama: 'Kreator STMM',
    prodi: 'STMM Yogyakarta',
    angkatan: karya.tahun
  };

  // Label kategori (khusus 'Film' ditampilkan 'Film Pendek' sesuai desain hi-fi)
  const labelKategori = karya.kategori === 'Film' ? 'Film Pendek' : karya.kategori;
  const labelSatuan = (KATEGORI[karya.kategori] && KATEGORI[karya.kategori].satuan) || 'Durasi';

  // URL tautan YouTube
  const urlYouTube = karya.youtubeId
    ? `https://www.youtube.com/watch?v=${encodeURIComponent(karya.youtubeId)}`
    : `https://www.youtube.com/results?search_query=${encodeURIComponent(karya.judul + ' STMM')}`;

  // Karya lain dari kreator yang sama (selain karya saat ini)
  const karyaLain = karyaMilik(karya.kreatorId).filter((k) => String(k.id) !== String(karya.id));

  const htmlKaryaLain = karyaLain.length > 0
    ? `<div class="grid-2">
        ${karyaLain.map((k) => `
          <a class="kartu" href="detail.html?id=${k.id}">
            ${thumbKarya(k, { label: false })}
            <span class="kartu__judul">${aman(k.judul)}</span>
          </a>
        `).join('')}
       </div>`
    : `<p class="teks-redup">Belum ada karya lain dari kreator ini.</p>`;

  wadahKonten.innerHTML = `
    <!-- Pratinjau / Pemutar Video -->
    <div class="pemutar" id="wadah-pemutar">
      ${karya.thumbnail ? `<img src="${aman(karya.thumbnail)}" alt="">` : ''}
      <div class="pemutar__overlay"></div>
      <button class="pemutar__putar" id="tombol-putar" type="button" aria-label="Putar video">
        ${IKON_PUTAR}
      </button>
      <span class="pemutar__ket">Video tersemat dari YouTube</span>
    </div>

    <!-- Header: Kategori, Genre & Judul -->
    <div class="detail__header">
      <div class="detail__tags">
        <span class="detail__chip detail__chip--kategori" style="${gayaKategori(karya.kategori)}">
          ${aman(labelKategori)}
        </span>
        ${karya.genre ? `<span class="detail__chip detail__chip--genre">${aman(karya.genre)}</span>` : ''}
      </div>
      <h1 class="detail__judul">${aman(karya.judul)}</h1>
    </div>

    <!-- Kotak Info Kreator -->
    <div class="kreator-box">
      <div class="kreator-box__kiri">
        <div class="kreator-box__avatar">${aman(inisial(kreator.nama))}</div>
        <div class="kreator-box__info">
          <span class="kreator-box__nama">${aman(kreator.nama)}</span>
          <span class="kreator-box__meta">${aman(kreator.prodi)} · Angkatan ${aman(kreator.angkatan)}</span>
        </div>
      </div>
      <a class="kreator-box__profil" href="kreator.html?id=${encodeURIComponent(kreator.id)}">Profil</a>
    </div>

    <!-- Sinopsis -->
    <p class="detail__sinopsis">${aman(karya.sinopsis)}</p>

    <!-- Grid Informasi (Tahun, Durasi, Mata Kuliah) -->
    <div class="info-grid">
      <div class="info-item">
        <span class="info-item__label">Tahun</span>
        <span class="info-item__nilai">${aman(karya.tahun)}</span>
      </div>
      <div class="info-item">
        <span class="info-item__label">${aman(labelSatuan)}</span>
        <span class="info-item__nilai">${aman(karya.durasi)}</span>
      </div>
      <div class="info-item">
        <span class="info-item__label">Mata Kuliah</span>
        <span class="info-item__nilai">${aman(karya.mataKuliah)}</span>
      </div>
    </div>

    <!-- Tombol Aksi: Bagikan & YouTube -->
    <div class="detail__aksi">
      <button class="tombol tombol--utama" id="tombol-bagikan-utama" type="button">
        Bagikan Karya
      </button>
      <a class="tombol tombol--garis" id="tombol-youtube" href="${urlYouTube}" target="_blank" rel="noopener noreferrer">
        Buka di YouTube
      </a>
    </div>

    <!-- Karya Lain dari Kreator -->
    <section class="bagian">
      <h2 class="judul-bagian">Karya Lain dari Kreator</h2>
      ${htmlKaryaLain}
    </section>
  `;

  // 6) Pasang aksi tombol bagikan (baik di bilah atas maupun tombol utama)
  if (tombolBagikanAtas) {
    tombolBagikanAtas.addEventListener('click', () => bagikanKarya(karya));
  }

  const tombolBagikanUtama = document.getElementById('tombol-bagikan-utama');
  if (tombolBagikanUtama) {
    tombolBagikanUtama.addEventListener('click', () => bagikanKarya(karya));
  }

  // 7) Pasang aksi tombol putar video
  const tombolPutar = document.getElementById('tombol-putar');
  if (tombolPutar) {
    tombolPutar.addEventListener('click', () => {
      if (karya.youtubeId) {
        const pemutar = document.getElementById('wadah-pemutar');
        pemutar.innerHTML = `
          <iframe
            src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(karya.youtubeId)}?autoplay=1"
            title="${aman(karya.judul)}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        `;
      } else {
        // Jika belum ada ID YouTube, arahkan ke pencarian YouTube atau buka link
        window.open(urlYouTube, '_blank', 'noopener,noreferrer');
      }
    });
  }
}
