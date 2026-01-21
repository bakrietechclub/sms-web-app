import { Button } from '../elements/Button';
import { Label } from '../elements/Label';
import { Pagination } from '../fragments/Pagination';
import { Table, FreezeTable } from '../fragments/Table';
import { Download, Share2, ChevronLeft } from 'lucide-react';

import { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  UnivSatisfactionSurveyCLP,
  UnivSatisfactionSurveyHOL,
  UnivSatisfactionSurveyLEAD,
} from '../../data/data_univ';
import {
  INGOSatisfactionSurveyCLP,
  INGOSatisfactionSurveyHOL,
  INGOSatisfactionSurveyLEAD,
} from '../../data/data_ingo';

export const SatisfactionSurvey = () => {
  const [clp, setClp] = useState(false);
  const [hol, setHol] = useState(false);
  const [lead, setLead] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState([]);

  const stakeholder = useSelector(
    (state) => state.activeStakeholder.activeStakeholder,
  );

  const handleClickDetail = () => {
    setShowDetail(!showDetail);
  };

  let dataRaw;
  if (stakeholder === 'universitas') {
    dataRaw = UnivSatisfactionSurveyLEAD;
  } else {
    dataRaw = INGOSatisfactionSurveyLEAD;
  }
  const [data, setData] = useState(dataRaw);

  const header = [
    'No',
    'Nama Responden',
    'Email',
    'No. WhatsApp',
    'Kategori Mitra',
    'Jabatan di Instansi',
    'Nama Mitra',
    'Asal Provinsi Mitra',
    'Tahun Kerjasama',
    'Aksi',
  ];

  const headerDetail = ['No.', 'Pertanyaan', 'Jawaban'];

  const handleLead = () => {
    setLead(true);
    setClp(false);
    setHol(false);
    if (stakeholder === 'universitas') {
      setData(UnivSatisfactionSurveyLEAD);
    } else {
      setData(INGOSatisfactionSurveyLEAD);
    }
  };

  const handleClp = () => {
    setLead(false);
    setClp(true);
    setHol(false);
    if (stakeholder === 'universitas') {
      setData(UnivSatisfactionSurveyCLP);
    } else {
      setData(INGOSatisfactionSurveyCLP);
    }
  };

  const handleHol = () => {
    setLead(false);
    setClp(false);
    setHol(true);
    if (stakeholder === 'universitas') {
      setData(UnivSatisfactionSurveyHOL);
    } else {
      setData(INGOSatisfactionSurveyHOL);
    }
  };

  const renderRowFreeze = (value, index) => (
    <tr
      key={index}
      className='border-b border-r border-[#E7EDF4] h-10'
    >
      <td className='border-b border-gray-200 py-3'>{index + 1}</td>
      <td className='border-b border-gray-200'>{value.name}</td>
    </tr>
  );

  const renderRow = (value, index) => (
    <tr
      key={index}
      className='border-b border-[#E7EDF4] h-10'
    >
      <td className='border-b border-gray-200 p-3'>{value.email}</td>
      <td className='border-b border-gray-200 px-2'>{value.whatsapp}</td>
      <td className='border-b border-gray-200 px-2'>{value.partnerCategory}</td>
      <td className='border-b border-gray-200 px-2'>{value.position}</td>
      <td className='border-b border-gray-200 px-2'>{value.partnerName}</td>
      <td className='border-b border-gray-200 px-2'>{value.partnerOrigin}</td>
      <td className='border-b border-gray-200 px-2'>{value.colabYear}</td>
      <td className='border-b border-gray-200 px-2'>
        <Button
          onClick={() => {
            setDataDetail(value.surveys);
            handleClickDetail();
          }}
          className='text-[#0D4690] underline cursor-pointer'
        >
          Lihat Detail
        </Button>
      </td>
    </tr>
  );

  const renderRowDetail = (value, index) => (
    <tr
      key={index}
      className='border-b border-[#E7EDF4] h-10'
    >
      <td className='border-b border-l border-gray-200 p-5'>{index + 1}</td>
      <td className='border-b border-gray-200 text-left'>{value.question}</td>
      <td className='border-b border-r border-gray-200 w-auto'>
        {value.answer === 'Tidak ada, sudah baik' ? (
          'Tidak ada, sudah baik.'
        ) : (
          <Label
            label={value.answer}
            status={
              value.answer === 'Sangat Setuju'
                ? 'success'
                : value.answer === 'Setuju'
                  ? 'info'
                  : value.answer === 'Tidak Setuju'
                    ? 'warning'
                    : 'danger'
            }
          />
        )}
      </td>
    </tr>
  );

  if (!showDetail) {
    return (
      <div>
        <h1 className='text-2xl font-semibold'>Data Hasil Survey</h1>
        <div className='flex justify-end gap-4 mb-4'>
          <Button
            type='button'
            className='bg-[#0D4690] text-white px-4 py-2 rounded-md'
          >
            <Download
              className='inline mr-2'
              size={16}
            />
            Download Data
          </Button>
          <Button
            type='button'
            className='bg-[#0D4690] text-white px-4 py-2 rounded-md'
          >
            <Share2
              className='inline mr-2'
              size={16}
            />
            Bagikan Form Survey
          </Button>
        </div>
        <div className='flex justify-start mb-4 gap-3 font-bold'>
          <Button
            type='button'
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
            type='button'
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
          <Button
            type='button'
            className={
              (hol
                ? 'text-[#0D4690] bg-[#E7EDF4]'
                : 'text-[#999999] border border-[#e6e6e6]') +
              ' py-4 px-8 rounded-xl cursor-pointer ease-in-out duration-300 w-40'
            }
            onClick={handleHol}
          >
            HOL
          </Button>
        </div>
        <div className=''>
          <FreezeTable
            headers={header}
            data={data}
            renderRow={renderRow}
            renderRowFreeze={renderRowFreeze}
            freezeCol={2}
          />
        </div>
        <Pagination />
      </div>
    );
  } else {
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
        <h1 className='inline-flex text-2xl font-semibold my-5 gap-2 mb-3'>
          Detail Hasil Survey |{' '}
          <div className='text-[#0D4690]'>
            Program Kerjasama {clp ? 'CLP' : lead ? 'LEAD' : 'HOL'}
          </div>
        </h1>
        <Table
          headers={headerDetail}
          data={dataDetail}
          renderRow={renderRowDetail}
        />
      </div>
    );
  }
};
