import { Label } from '../../elements/Label';
import { Button } from '../../elements/Button';
import { FreezeTable } from '../../fragments/Table';
import { Pagination } from '../../fragments/Pagination';
import { TableToolbar } from '../../fragments/TableToolbar';
import { useState } from 'react';
import { ChevronLeft, ListFilter } from 'lucide-react';

import {
  UnivPtaRecap,
  UnivPtaRecapLEAD,
  UnivPtaRecapCLP,
} from '../../../data/data_univ';
import { div } from 'framer-motion/client';

export const Pta = () => {
  const [clp, setClp] = useState(false);
  const [lead, setLead] = useState(true);
  const [search, setSearch] = useState('');
  const [showDetail, setShowDetail] = useState(false);
  const [showCLPDetail, setShowCLPDetail] = useState(false);
  const [selected, setSelected] = useState({
    name: '',
    type: '',
    colabStatus: '',
    mouDue: '',
    pksDue: '',
    dueDate: '',
    status: [],
  });
  const [selectedCLP, setSelectedCLP] = useState({
    year: '',
    batch: '',
    colabDetail: '',
    students: [],
  });

  const handleClickDetail = () => {
    setShowDetail(!showDetail);
  };

  const handleClickCLPDetail = () => {
    setShowCLPDetail(!showCLPDetail);
  };

  const handleLead = () => {
    setLead(true);
    setClp(false);
  };
  const handleClp = () => {
    setLead(false);
    setClp(true);
  };

  const renderRowFreeze = (value, index) => (
    <tr key={index} className="border-x border-r border-[#E7EDF4] h-10">
      <td className="border-b border-gray-200 py-3">{index + 1}</td>
      <td className="border-b border-gray-200">{value.name}</td>
      <td className="border-b border-gray-200">{value.type}</td>
      <td className="border-b border-gray-200">
        <Label label={value.colabStatus} status="success" />
      </td>
    </tr>
  );

  const renderRow = (value, index) => (
    <tr key={index} className="border-x border-[#E7EDF4] h-10">
      <td className="border-b border-gray-200 px-4 py-2">{value.mouDue}</td>
      <td className="border-b border-gray-200 px-4 py-2">{value.pksDue}</td>
      <td className="border-b border-gray-200 px-4 py-2">{value.dueDate}</td>
      <td className="border-b border-gray-200 px-4 py-3 flex flex-wrap gap-1">
        {value.status.length > 0 ? (
          value.status.map((status, idx) => (
            <Label
              key={idx}
              label={status}
              status={
                status === 'LEAD'
                  ? 'default'
                  : status === 'CLP'
                  ? 'warning'
                  : status === 'HOL'
                  ? 'success'
                  : status === 'BCF'
                  ? 'danger'
                  : 'default'
              }
            />
          ))
        ) : (
          <span>-</span>
        )}
      </td>
      <td className="border-b border-gray-200 px-4 py-2">
        <Button
          onClick={() => {
            setSelected(value);
            handleClickDetail();
          }}
          className="text-[#0D4690] underline cursor-pointer"
        >
          Lihat Detail
        </Button>
      </td>
    </tr>
  );

  const customHeaderRight = (
    <>
      <tr>
        <th
          className="p-3 text-base font-semibold border border-gray-400 px-4 py-2"
          rowSpan={2}
        >
          Jatuh Tempo MoU
        </th>
        <th
          className="p-3 text-base font-semibold border border-gray-400 px-4 py-2"
          rowSpan={2}
        >
          Jatuh Tempo PKS
        </th>
        <th
          className="p-3 text-base font-semibold border border-gray-400 px-4 py-2 rounded-tr-xl"
          colSpan={3}
        >
          Implementasi Kerja Sama
        </th>
      </tr>
      <tr>
        <th className="p-3 text-base font-semibold border border-gray-400 px-4 py-2">
          Jatuh Tempo
        </th>
        <th className="p-3 text-base font-semibold border border-gray-400 px-4 py-2">
          Status
        </th>
        <th className="p-3 text-base font-semibold border border-gray-400 px-4 py-2">
          Aksi
        </th>
      </tr>
    </>
  );

  if (!showDetail) {
    return (
      <div>
        <h1 className="text-2xl font-semibold">Rekap PTA</h1>
        <TableToolbar
          searchValue={search}
          onSearchChange={setSearch}
          filters={[
            {
              label: 'Jenis Instansi',
              options: [
                { label: 'Universitas', value: 'universitas' },
                { label: 'Lembaga Sosial', value: 'lembaga sosial' },
              ],
            },
            {
              label: 'Tahun Kerjasama',
              options: [
                { label: '2020', value: '2020' },
                { label: '2021', value: '2021' },
                { label: '2022', value: '2022' },
                { label: '2023', value: '2023' },
                { label: '2024', value: '2024' },
              ],
            },
          ]}
          onFilterSet={() => console.log('Filter diset')}
          searchWidth="w-1/3"
        />
        <div>
          <FreezeTable
            headers={[
              'No',
              'Nama Instansi',
              'Jenis Instansi',
              'Status Kerjasama',
              'Jatuh Tempo MoU',
              'Jatuh Tempo PKS',
              'Jatuh Tempo',
              'Status',
              'Aksi',
            ]}
            data={UnivPtaRecap}
            renderRow={renderRow}
            renderRowFreeze={renderRowFreeze}
            freezeCol={4}
            customHeaderRight={customHeaderRight}
            withHeaderColumnBorders={true}
          />
        </div>
        <Pagination />
      </div>
    );
  } else if (showDetail && !showCLPDetail) {
    return (
      <div>
        <Button
          className={'text-[#0D4690] cursor-pointer flex'}
          onClick={() => {
            handleClickDetail();
          }}
        >
          <ChevronLeft /> Kembali
        </Button>
        <h1 className="text-2xl font-semibold my-5">
          Data Lengkap Implementasi Kerjasama
        </h1>
        <div className="grid grid-cols-2 gap-y-7 mb-7">
          <div>
            <p className="font-semibold">Nama Universitas:</p>
            <p className="ml-2">{selected.name}</p>
          </div>
          <div>
            <p className="font-semibold">Jenis Instansi:</p>
            <p className="ml-2">{selected.type}</p>
          </div>
          <div>
            <p className="font-semibold">Status Kerjasama:</p>
            <Label
              label={selected.colabStatus}
              status={
                selected.colabStatus === 'Sedang Berlangsung'
                  ? 'success'
                  : 'danger'
              }
            />
          </div>
          <div>
            <p className="font-semibold">Program Kerjasama:</p>
            <div className="flex flex-wrap gap-1">
              {selected.status.length > 0 ? (
                selected.status.map((status, idx) => (
                  <Label
                    key={idx}
                    label={status}
                    status={
                      status === 'LEAD'
                        ? 'default'
                        : status === 'CLP'
                        ? 'warning'
                        : status === 'HOL'
                        ? 'success'
                        : status === 'BCF'
                        ? 'danger'
                        : 'default'
                    }
                  />
                ))
              ) : (
                <span>-</span>
              )}
            </div>
          </div>
          <div>
            <p className="font-semibold">Status MoU:</p>
            <span>-</span>
          </div>
          <div>
            <p className="font-semibold">Status PKS:</p>
            <span>-</span>
          </div>
          <div>
            <p className="font-semibold">Terakhir Tanda Tangan MoU:</p>
            <span>-</span>
          </div>
          <div>
            <p className="font-semibold">Terakhir Tanda Tangan PKS:</p>
            <span>-</span>
          </div>
          <div>
            <p className="font-semibold">Jatuh Tempo MoU:</p>
            <p>{selected.mouDue}</p>
          </div>
          <div>
            <p className="font-semibold">Jatuh Tempo PKS:</p>
            <p>{selected.pksDue}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Implementasi Kerjasama</h2>
          <button
            className="flex gap-3 items-center border border-[#CCCCCC] text-[#999999] hover:bg-[#E6E6E6] px-4 py-2 rounded-md mb-4 ml-2 cursor-pointer"
            // onClick={() => setShowFilterMenu(!showFilterMenu)}
          >
            <ListFilter className="w-4 h-4" />
            Filter
          </button>
        </div>
        <div className="flex justify-start mb-4 gap-3 font-bold">
          <Button
            type="button"
            className={
              (lead
                ? 'text-[#0D4690] bg-[#E7EDF4]'
                : 'text-[#999999] border border-[#e6e6e6]') +
              ' py-4 px-8 rounded-xl cursor-pointer ease-in-out duration-300 w-40'
            }
            onClick={handleLead}
          >
            LEAD
          </Button>
          <Button
            type="button"
            className={
              (clp
                ? 'text-[#0D4690] bg-[#E7EDF4]'
                : 'text-[#999999] border border-[#e6e6e6]') +
              ' py-4 px-8 rounded-xl cursor-pointer ease-in-out duration-300 w-40'
            }
            onClick={handleClp}
          >
            CLP
          </Button>
        </div>
        <table className="table-auto text-center w-full">
          <thead className="text-[#0D4690] bg-[#E7EDF4]">
            <tr className="h-10 text-base font-semibold">
              {lead && (
                <>
                  <th className="rounded-tl-xl">No.</th>
                  <th>Tahun</th>
                  <th>Program</th>
                  <th className="rounded-tr-xl">Detail Kerjasama</th>
                </>
              )}
              {clp && (
                <>
                  <th className="rounded-tl-xl">No.</th>
                  <th>Tahun</th>
                  <th>Batch</th>
                  <th>Detail Kerjasama</th>
                  <th className="rounded-tr-xl">Mahasiswa</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="text-base border-x border-[#E7EDF4] h-10">
            {lead &&
              UnivPtaRecapLEAD.map((item, index) => (
                <tr key={index} className="border-b border-[#E7EDF4] h-10">
                  <td className="py-3">{index + 1}</td>
                  <td>{item.year}</td>
                  <td>{item.program}</td>
                  <td>{item.colabDetail}</td>
                </tr>
              ))}
            {clp &&
              UnivPtaRecapCLP.map((item, index) => (
                <tr key={index} className="border-b border-[#E7EDF4] h-10">
                  <td className="py-3">{index + 1}</td>
                  <td>{item.year}</td>
                  <td>{item.batch}</td>
                  <td className="text-[#0D4690] underline">
                    {item.colabDetail}
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        setSelectedCLP(item);
                        handleClickCLPDetail();
                      }}
                      className="text-[#0D4690] underline cursor-pointer"
                    >
                      {item.students.length} Mahasiswa
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination />
      </div>
    );
  } else {
    return (
      <div>
        <Button
          className={'text-[#0D4690] cursor-pointer flex'}
          onClick={() => {
            handleClickCLPDetail();
          }}
        >
          <ChevronLeft /> Kembali
        </Button>
        <h1 className="text-2xl font-semibold my-4">Data Mahasiswa</h1>
        <Label label={'CLP Batch ' + selectedCLP.batch} status="warning" />
        <h2 className="text-xl font-semibold my-2">Mahasiswa Magang</h2>
        <table className="table-auto text-center w-full">
          <thead className="text-[#0D4690] bg-[#E7EDF4]">
            <tr className="h-10 text-base font-semibold">
              <th className="rounded-tl-xl">No.</th>
              <th>Provinsi Penempatan</th>
              <th>Lembaga Penempatan</th>
              <th>Nama Mahasiswa</th>
              <th>Posisi / Divisi</th>
              <th className="rounded-tr-xl">Program Studi</th>
            </tr>
          </thead>
          <tbody className="text-base border-x border-[#E7EDF4] h-10">
            {selectedCLP.students.map((student, index) => (
              <tr key={index} className="border-b border-[#E7EDF4] h-10">
                <td className="py-3">{index + 1}</td>
                <td>{student.province}</td>
                <td>{student.institute}</td>
                <td>{student.studentName}</td>
                <td>{student.studentDivision}</td>
                <td>{student.studentMajor}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination />
        <h2 className="text-xl font-semibold my-2">Mahasiswa Praktikum</h2>
        <table className="table-auto text-center w-full">
          <thead className="text-[#0D4690] bg-[#E7EDF4]">
            <tr className="h-10 text-base font-semibold">
              <th className="rounded-tl-xl">No.</th>
              <th>Provinsi Penempatan</th>
              <th>Lembaga Penempatan</th>
              <th>Nama Mahasiswa</th>
              <th>Posisi / Divisi</th>
              <th className="rounded-tr-xl">Program Studi</th>
            </tr>
          </thead>
          <tbody className="text-base border-x border-[#E7EDF4] h-10">
            {selectedCLP.students.map((student, index) => (
              <tr key={index} className="border-b border-[#E7EDF4] h-10">
                <td className="py-3">{index + 1}</td>
                <td>{student.province}</td>
                <td>{student.institute}</td>
                <td>{student.studentName}</td>
                <td>{student.studentDivision}</td>
                <td>{student.studentMajor}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination />
        <h2 className="text-xl font-semibold my-2">Mahasiswa Volunteer</h2>
        <table className="table-auto text-center w-full">
          <thead className="text-[#0D4690] bg-[#E7EDF4]">
            <tr className="h-10 text-base font-semibold">
              <th className="rounded-tl-xl">No.</th>
              <th>Provinsi Penempatan</th>
              <th>Lembaga Penempatan</th>
              <th>Nama Mahasiswa</th>
              <th>Posisi / Divisi</th>
              <th className="rounded-tr-xl">Program Studi</th>
            </tr>
          </thead>
          <tbody className="text-base border-x border-[#E7EDF4] h-10">
            {selectedCLP.students.map((student, index) => (
              <tr key={index} className="border-b border-[#E7EDF4] h-10">
                <td className="py-3">{index + 1}</td>
                <td>{student.province}</td>
                <td>{student.institute}</td>
                <td>{student.studentName}</td>
                <td>{student.studentDivision}</td>
                <td>{student.studentMajor}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination />
      </div>
    );
  }
};
