export type TermsSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type TermsDocument = {
  id: "master" | "buyer";
  title: string;
  subtitle?: string;
  effectiveDate: string;
  sections: TermsSection[];
};

export const buyerRegisterTermsDocs: TermsDocument[] = [
  {
    id: "master",
    title: "Ketentuan Umum Layanan",
    subtitle: "Account Arena",
    effectiveDate: "11 February 2026",
    sections: [
      {
        title: "Informasi Layanan",
        paragraphs: [
          "Dikelola oleh: Account Arena",
          "Kontak: admin@accountarena.com",
        ],
      },
      {
        title: "1. Ruang Lingkup",
        paragraphs: [
          "Ketentuan Umum Layanan (\"Ketentuan Umum\") mengatur syarat penggunaan Account Arena (\"Platform\") oleh setiap pengguna (\"Pengguna\").",
          "Ketentuan Umum ini merupakan satu kesatuan yang tidak terpisahkan dengan Lampiran A (Ketentuan Buyer), Lampiran B (Ketentuan Seller), dan Privacy Notice & Consent (jika dipublikasikan terpisah).",
          "Apabila terdapat pertentangan antara Ketentuan Umum dan Lampiran, maka Lampiran yang lebih spesifik berlaku untuk hal tersebut.",
        ],
      },
      {
        title: "2. Definisi",
        bullets: [
          "Buyer: Pengguna yang melakukan pembelian akun melalui Platform.",
          "Seller: Pengguna yang menawarkan/menjual akun melalui Platform.",
          "Akun: akun game/digital sebagaimana tercantum pada Listing.",
          "Listing: penawaran Akun yang dibuat Seller di Platform.",
          "Escrow: mekanisme penahanan dana sampai terpenuhi syarat pelepasan dana (Release/Auto-release) atau refund sesuai ketentuan.",
          "Release dan Auto-release: sebagaimana dijelaskan pada Lampiran A dan Lampiran B.",
          "Delivered: sebagaimana dijelaskan pada Lampiran A (titik awal Inspection Window).",
        ],
      },
      {
        title: "3. Kedudukan Platform",
        paragraphs: [
          "Platform adalah penyedia layanan perantara (marketplace) yang memfasilitasi transaksi antara Buyer dan Seller, termasuk menyediakan fitur komunikasi, serah-terima, escrow, dan penanganan dispute sesuai kebijakan Platform.",
          "Platform bukan pihak penjual maupun pemilik Akun, bukan publisher/pengembang game, dan tidak mewakili publisher.",
          "Setiap transaksi Akun adalah transaksi antara Buyer dan Seller, dan Platform bertindak sesuai peran yang didefinisikan dalam Ketentuan ini.",
        ],
      },
      {
        title: "4. Penerimaan Ketentuan",
        paragraphs: [
          "Dengan mendaftar, mengakses, atau menggunakan layanan Platform, Pengguna menyatakan telah membaca, memahami, dan menyetujui Ketentuan Umum, Lampiran, dan Privacy Notice & Consent.",
          "Jika Pengguna tidak menyetujui, Pengguna wajib menghentikan penggunaan Platform.",
        ],
      },
      {
        title: "5. Kelayakan Pengguna",
        paragraphs: [
          "Pengguna menyatakan memiliki kecakapan hukum untuk mengikatkan diri dalam perjanjian ini.",
          "Platform dapat meminta verifikasi tambahan (termasuk KYC) untuk kepentingan keamanan, kepatuhan, dan pencegahan penipuan.",
        ],
      },
      {
        title: "6. Akun Pengguna, Keamanan, dan Tanggung Jawab",
        paragraphs: [
          "Pengguna bertanggung jawab atas keamanan akun Platform miliknya, termasuk kerahasiaan password/OTP, dan segala aktivitas yang terjadi pada akun tersebut.",
          "Pengguna dilarang menggunakan akun pihak lain, menyalahgunakan sistem, atau melakukan tindakan yang mengganggu layanan Platform.",
        ],
      },
      {
        title: "7. Pengungkapan Risiko Kebijakan Pihak Ketiga",
        paragraphs: [
          "Pengguna memahami bahwa jual beli Akun dapat melanggar ketentuan layanan pihak ketiga/publisher.",
          "Platform menyediakan layanan sebagai marketplace dan dapat memberikan edukasi/peringatan risiko, namun keputusan untuk bertransaksi adalah keputusan Pengguna sendiri.",
          "Platform tidak menjamin Akun akan bebas dari tindakan penegakan kebijakan pihak ketiga (mis. ban/lock/revoke akses), terutama setelah transaksi dinyatakan final (Release/Auto-release).",
        ],
      },
      {
        title: "8. Larangan Umum (Prohibited Conduct)",
        bullets: [
          "Melakukan penipuan, rekayasa dispute, kolusi, chargeback tidak sah, atau kegiatan sejenis.",
          "Menjual/menawarkan Akun yang berasal dari akses ilegal (peretasan, phishing, pencurian, atau metode melawan hukum).",
          "Melakukan hackback/reclaim Akun setelah serah-terima.",
          "Mengunggah informasi listing yang menyesatkan.",
          "Menyebarkan malware, melakukan eksploitasi sistem, scraping tanpa izin, atau mengganggu layanan.",
          "Meminta/mengarahkan transaksi dilakukan di luar mekanisme Platform untuk menghindari escrow/biaya/dispute.",
        ],
      },
      {
        title: "9. Biaya Layanan",
        paragraphs: [
          "Platform dapat mengenakan biaya layanan (mis. Fee Buyer dan/atau Fee Seller) yang ditampilkan secara transparan sebelum transaksi diproses.",
          "Ketentuan biaya lebih lanjut diatur dalam Lampiran A dan Lampiran B serta tampilan checkout/halaman transaksi yang berlaku.",
        ],
      },
      {
        title: "10. Hak Platform untuk Moderasi, Penolakan, dan Penindakan",
        paragraphs: [
          "Platform berhak menolak, menurunkan, membatasi visibilitas, atau menghapus Listing/akun Pengguna apabila terdapat indikasi pelanggaran Ketentuan ini, permintaan otoritas, atau alasan keamanan.",
          "Platform berhak membekukan akun, menahan proses payout, atau menutup akun Pengguna jika diperlukan untuk investigasi, penyelesaian dispute, pencegahan kerugian, atau kepatuhan hukum.",
          "Platform dapat menerapkan sanksi bertingkat hingga blacklist permanen.",
        ],
      },
      {
        title: "11. Kekayaan Intelektual",
        paragraphs: [
          "Seluruh merek, logo, tampilan aplikasi/website, dan konten milik Platform adalah milik Platform atau pemberi lisensinya. Pengguna dilarang menggunakan tanpa izin tertulis.",
        ],
      },
      {
        title: "12. Pembatasan Tanggung Jawab",
        paragraphs: [
          "Platform menyediakan layanan \"sebagaimana adanya\" (as is) dan \"sebagaimana tersedia\" (as available).",
          "Platform tidak bertanggung jawab atas kerugian tidak langsung (mis. kehilangan progres, reputasi, peluang, keuntungan, dsb).",
          "Platform tidak bertanggung jawab atas kebijakan pihak ketiga/publisher.",
          "Pembatasan tanggung jawab ini berlaku sepanjang diizinkan oleh peraturan perundang-undangan yang berlaku dan tidak mengurangi hak yang tidak dapat dikesampingkan.",
        ],
      },
      {
        title: "13. Ganti Rugi (Indemnity)",
        paragraphs: [
          "Pengguna setuju untuk membebaskan dan mengganti rugi Platform dari klaim/kerugian yang timbul akibat pelanggaran Ketentuan ini oleh Pengguna, tindakan melawan hukum, atau sengketa pihak ketiga yang timbul dari Listing/Akun yang ditransaksikan.",
        ],
      },
      {
        title: "14. Perubahan Ketentuan",
        paragraphs: [
          "Platform dapat mengubah Ketentuan ini sewaktu-waktu. Versi terbaru akan dipublikasikan. Penggunaan Platform setelah perubahan berarti Pengguna menyetujui ketentuan terbaru.",
        ],
      },
      {
        title: "15. Hukum yang Berlaku dan Penyelesaian Sengketa",
        paragraphs: [
          "Ketentuan ini tunduk pada hukum Republik Indonesia. Sengketa diselesaikan terlebih dahulu melalui musyawarah/mediasi. Jika tidak tercapai, diselesaikan melalui forum yang ditentukan sesuai ketentuan hukum yang berlaku.",
        ],
      },
      {
        title: "16. Kontak",
        paragraphs: ["Untuk pertanyaan atau keluhan, Pengguna dapat menghubungi: admin@accountarena.com."],
      },
    ],
  },
  {
    id: "buyer",
    title: "Lampiran A – Syarat dan Ketentuan Buyer",
    subtitle: "Bagian dari Ketentuan Umum Layanan Account Arena",
    effectiveDate: "11 February 2026",
    sections: [
      {
        title: "1. Ruang Lingkup",
        paragraphs: ["Ketentuan ini berlaku bagi setiap Buyer yang melakukan transaksi pembelian Akun melalui Platform."],
      },
      {
        title: "2. Alur Transaksi dan Escrow",
        paragraphs: [
          "Setelah Buyer melakukan pembayaran, dana akan ditahan dalam Escrow sampai terpenuhi syarat pelepasan dana atau refund sesuai Ketentuan ini.",
          "Buyer wajib mengikuti seluruh instruksi serah-terima dan dispute melalui fitur resmi Platform.",
        ],
      },
      {
        title: "3. Harga dan Biaya",
        paragraphs: [
          "Harga pada Listing adalah Harga Akun yang ditentukan Seller.",
          "Buyer dikenakan Fee Buyer yang ditampilkan saat checkout.",
          "Fee Buyer menjadi hak Platform hanya apabila transaksi dinyatakan Sukses (Release/Auto-release).",
          "Dalam hal refund yang valid, Harga Akun dan Fee Buyer dikembalikan penuh kepada Buyer.",
        ],
      },
      {
        title: "4. Definisi Delivered dan Awal Perhitungan 24 Jam",
        paragraphs: [
          "Delivered adalah kondisi ketika Platform telah menyediakan kredensial/akses Akun kepada Buyer melalui kanal resmi Platform sehingga Buyer memiliki kesempatan untuk mengakses dan melakukan verifikasi.",
          "Timestamp Delivered dicatat oleh sistem dan menjadi titik awal Inspection Window.",
          "Buyer dianggap telah menerima serah-terima pada saat Delivered tercatat, terlepas dari apakah Buyer segera memeriksa atau menunda pemeriksaan.",
        ],
      },
      {
        title: "5. Kewajiban Buyer Saat Serah-terima (Pengamanan)",
        paragraphs: [
          "Buyer wajib segera melakukan tindakan pengamanan yang wajar dan tersedia, termasuk namun tidak terbatas pada:",
        ],
        bullets: [
          "Mengganti password.",
          "Mengaktifkan 2FA bila tersedia.",
          "Revoke session/device.",
          "Mengganti email/recovery bila dijanjikan/tersedia.",
          "Kelalaian Buyer dalam pengamanan dapat menjadi pertimbangan Platform dalam menilai dispute (mis. akses pihak lain yang terjadi akibat kelalaian Buyer).",
        ],
      },
      {
        title: "6. Inspection Window dan Dispute Window (24 Jam)",
        paragraphs: [
          "Setelah Delivered, Buyer memiliki waktu maksimal 24 (dua puluh empat) jam (\"Inspection Window\") untuk:",
        ],
        bullets: [
          "Memeriksa kesesuaian Akun dengan Listing.",
          "Mengajukan Dispute melalui fitur resmi Platform.",
          "Selama Buyer belum menekan Release, dana tidak akan dilepas kepada Seller.",
          "Jika Buyer tidak menekan Release dan tidak mengajukan Dispute sampai 24 jam berakhir, sistem akan melakukan Auto-release.",
        ],
      },
      {
        title: "7. Alasan Dispute yang Dapat Diterima",
        paragraphs: ["Buyer dapat mengajukan Dispute dalam 24 jam untuk alasan berikut (non-limitatif):"],
        bullets: [
          "Material Mismatch: perbedaan material antara Akun dan Listing, termasuk namun tidak terbatas pada rank/level, item/skin utama yang dijanjikan, region/server, akses email utama bila dijanjikan, status ban/lock pada saat serah-terima, atau atribut lain yang eksplisit dijanjikan pada Listing.",
          "Kredensial/akses tidak valid (Buyer tidak dapat login karena kesalahan data yang diberikan Seller).",
          "Seller Unresponsive sehingga serah-terima tidak dapat diselesaikan secara wajar dalam window.",
          "Indikasi kuat adanya perubahan akses yang terjadi dalam window serah-terima (mis. kredensial berubah sebelum transaksi final), sepanjang didukung bukti yang wajar.",
        ],
      },
      {
        title: "8. Standar Bukti dan Proses Dispute",
        paragraphs: [
          "Buyer wajib memberikan bukti yang wajar (mis. rekaman layar login, screenshot inventory, bukti status akun, dan/atau catatan komunikasi dalam Platform).",
          "Platform berhak meminta bukti tambahan dengan tenggat waktu tertentu.",
          "Apabila Buyer tidak memberikan bukti yang diminta dalam tenggat waktu, Platform dapat menolak Dispute.",
          "Platform berwenang memutus Dispute berdasarkan bukti yang tersedia.",
        ],
      },
      {
        title: "9. Hasil Dispute dan Refund",
        paragraphs: [
          "Jika Dispute dinyatakan valid akibat kesalahan Seller, Buyer berhak memperoleh FULL REFUND (Harga Akun + Fee Buyer).",
          "Seller dapat dikenakan sanksi termasuk blacklist permanen.",
          "Refund diproses sesuai metode pembayaran dan ketentuan penyedia pembayaran (waktu proses dapat bervariasi).",
        ],
      },
      {
        title: "10. Release, Auto-release, dan Finalitas Transaksi",
        paragraphs: [
          "Buyer wajib menekan Release setelah pemeriksaan selesai dan Buyer menyatakan Akun sesuai.",
          "Jika Buyer tidak melakukan Release dan tidak mengajukan Dispute dalam 24 jam sejak Delivered, sistem akan melakukan Auto-release.",
          "Setelah Release atau Auto-release, transaksi escrow dinyatakan final dan selesai, dan Platform tidak berkewajiban melakukan refund, kecuali diwajibkan oleh ketentuan hukum yang berlaku.",
        ],
      },
      {
        title: "11. Risiko Kebijakan Publisher (ToS) dan Potensi Ban/Lock",
        paragraphs: [
          "Buyer memahami bahwa jual beli Akun dapat bertentangan dengan ketentuan publisher.",
          "Setelah transaksi final (Release/Auto-release), risiko penegakan kebijakan publisher (ban/lock/revoke) berada pada Buyer.",
          "Platform dapat membantu secara administratif (mis. penyediaan log transaksi) dan kerja sama hukum sesuai Ketentuan Umum dan Privacy Notice, namun tanpa menjanjikan pemulihan dana setelah transaksi final.",
        ],
      },
      {
        title: "12. Larangan Kolusi dan Chargeback Tidak Sah",
        paragraphs: [
          "Jika Buyer terbukti melakukan kolusi, klaim palsu, atau chargeback tidak sah, Platform berhak menolak klaim, membekukan akun, dan/atau menerapkan biaya investigasi yang wajar sesuai kebijakan Platform.",
        ],
      },
      {
        title: "13. Kerja Sama Hukum",
        paragraphs: [
          "Jika Buyer ingin menempuh jalur hukum, Platform dapat membantu menyediakan data transaksi/log yang relevan sesuai ketentuan hukum.",
          "Dokumen KYC Seller tidak diberikan langsung kepada Buyer tanpa dasar hukum yang sah (mis. permintaan aparat atau perintah pengadilan).",
        ],
      },
    ],
  },
];

