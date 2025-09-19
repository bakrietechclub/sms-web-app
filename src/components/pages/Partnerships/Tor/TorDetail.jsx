import React from 'react';
import { Button } from '../../../elements/Button';
import { ChevronLeft } from 'lucide-react';
import { Label } from '../../../elements/Label';

export default function TorDetail() {
  return (
    <div>
      <Button
        className="text-[#0D4690] cursor-pointer flex"
        onClick={() => setShowDetail(false)}
      >
        <ChevronLeft /> Kembali
      </Button>
      <h1 className="text-2xl font-semibold my-4">Data Lengkap ToR</h1>
      <div className="flex justify-end">
        <Button className="bg-[#0D4690] text-white rounded-md px-4 py-2">
          Perbarui
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-y-5 mb-5">
        <div>
          <p className="font-semibold">Nama Universitas:</p>
          <p className="ml-2">{selected.name}</p>
        </div>
        <div>
          <p className="font-semibold">Jenis Instansi:</p>
          <p className="ml-2">{selected.jenis}</p>
        </div>
        <div>
          <p className="font-semibold">Divisi Instansi:</p>
          <p className="ml-2">{selected.division}</p>
        </div>
        <div>
          <p className="font-semibold">Status PKS:</p>
          <Label label={'CLP'} status="warning" />
        </div>
        <div>
          <p className="font-semibold">Detail Kerjasama:</p>
          <p className="ml-2">-</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-y-5 mb-5">
        <div>
          <p className="font-semibold">Jenis Surat:</p>
          <p className="ml-2">-</p>
        </div>
        <div>
          <p className="font-semibold">Status:</p>
          <Label label={'Sudah diperiksa oleh mitra'} />
        </div>
        <div className="">
          <p className="font-semibold">Tanggal Jatuh Tempo:</p>
          <p className="">{selected.dueDate}</p>
        </div>
        <div className="">
          <p className="font-semibold">Tanggal Tanda Tangan:</p>
          <p className="">{selected.signYear}</p>
        </div>
        <div className="">
          <p className="font-semibold">Link Dokumentasi:</p>
          <a href="#" className="text-[#0D4690] italic underline">
            Link Dokumen
          </a>
        </div>
        <div className="">
          <p className="font-semibold">Jangka Waktu:</p>
          <p className="">{selected.duration}</p>
        </div>
      </div>
    </div>
  );
}
