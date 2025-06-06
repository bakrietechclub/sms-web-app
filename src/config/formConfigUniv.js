export const formConfigUniv = [
  {
    type: "text",
    name: "namaInstansi",
    label: "Nama Instansi",
    placeholder: "Masukkan nama instansi",
  },
  {
    type: "select",
    name: "provinsi",
    label: "Provinsi",
    options: [
      "Nasional", "Aceh", "Bali", "Banten", "Jawa Barat", "DKI Jakarta", "Sumatera Utara"
    ],
  },
  {
    type: "checkbox",
    name: "programLSD",
    label: "Program LSD",
    options: ["LEAD", "CLP", "HOL"],
  },
  {
    type: "text",
    name: "kontakEmail",
    label: "Email Kontak",
    placeholder: "contoh@email.com",
  },
];
