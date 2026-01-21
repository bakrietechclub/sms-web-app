import React, { useRef, useEffect } from 'react';
// Asumsi 'useLocation' digunakan, Anda mungkin perlu mengimpornya dari 'react-router-dom'
// const useLocation = () => ({ pathname: '/' });

// Komponen Table yang sudah ada
export const Table = ({ headers = [], data = [], renderRow, isLoading = false }) => (
  <table className="table-auto text-center w-full border-separate border-spacing-0">
    {/* Header Section Styling */}
    <thead className="text-[#0D4690] bg-[#E7EDF4]">
      <tr className="h-12">
        {headers.map((header, index) => (
          <th
            key={index}
            className={`
              text-sm font-semibold p-4
              // Mengatur pembulatan sudut di sudut baris header
              ${index === 0 ? 'rounded-tl-xl' : ''} 
              ${index === headers.length - 1 ? 'rounded-tr-xl' : ''}
            `}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>

    {/* Body Section Styling */}
    <tbody className="text-sm font-normal text-gray-700">
      {isLoading ? (
        <TableSkeleton colCount={headers.length} rowCount={data.length || 5} />
      ) : (
        data?.map((item, index) => (
          // Menggunakan renderRow untuk mengembalikan baris (<tr>) lengkap
          // Catatan: Pastikan renderRow mengembalikan elemen <tr>
          <React.Fragment key={index}>{renderRow(item, index)}</React.Fragment>
        ))
      )}
    </tbody>
  </table>
);

// Fungsi sinkronisasi tinggi baris (diekstrak untuk kebersihan kode)
const synchronizeRowHeights = (leftRef, rightRef, dataLength) => {
  const leftRows = leftRef.current?.querySelectorAll('tbody tr') || [];
  const rightRows = rightRef.current?.querySelectorAll('tbody tr') || [];

  for (let i = 0; i < dataLength; i++) {
    const leftRow = leftRows[i];
    const rightRow = rightRows[i];

    if (leftRow && rightRow) {
      // Resetting height ensures that we get the true content height before syncing
      leftRow.style.height = '';
      rightRow.style.height = '';

      // Mengambil tinggi baris setelah reset
      const leftHeight = leftRow.offsetHeight;
      const rightHeight = rightRow.offsetHeight;
      const maxHeight = Math.max(leftHeight, rightHeight);

      // Set height only if needed to avoid unnecessary DOM writes
      if (leftRow.style.height !== `${maxHeight}px`) {
        leftRow.style.height = `${maxHeight}px`;
      }
      if (rightRow.style.height !== `${maxHeight}px`) {
        rightRow.style.height = `${maxHeight}px`;
      }
    }
  }
};

// Komponen Skeleton untuk tampilan loading
const TableSkeleton = ({ colCount, rowCount = 5 }) => {
  const rows = Array(rowCount).fill(0);
  const cols = Array(colCount).fill(0);

  return (
    <React.Fragment>
      {rows.map((_, rowIndex) => (
        <tr key={rowIndex} className="h-12">
          {cols.map((_, colIndex) => (
            <td key={colIndex} className="p-4 border-b border-gray-200">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </td>
          ))}
        </tr>
      ))}
    </React.Fragment>
  );
};

// Komponen FreezeTable yang disesuaikan
export const FreezeTable = ({
  headers = [],
  data = [],
  renderRow,
  renderRowFreeze,
  freezeCol = 4,
  customHeaderLeft,
  customHeaderRight,
  withHeaderColumnBorders = false,
  // === PROPS BARU ===
  isLoading = false,
}) => {
  const frozenHeaders = headers.slice(0, freezeCol);
  const unfrozenHeaders = headers.slice(freezeCol);

  // Placeholder untuk useLocation agar tidak error di lingkungan kompilasi
  const useLocation = () => ({ pathname: '/' });
  const location = useLocation();
  const isRecapPtaPage = location.pathname === '/media-recap';

  const leftTableRef = useRef(null);
  const rightTableRef = useRef(null);

  useEffect(() => {
    // Jalankan sinkronisasi hanya jika data tidak dalam keadaan loading
    if (!isLoading && data.length > 0) {
      synchronizeRowHeights(leftTableRef, rightTableRef, data.length);
    }
  }, [data, isLoading]); // Dependensi data dan isLoading memastikan sinkronisasi berjalan saat data dimuat

  return (
    <div className="w-full overflow-hidden">
      <div className="flex w-full">
        {/* Fixed Column */}
        <div className="w-[40%] overflow-hidden mr-[1px]" ref={leftTableRef}>
          <table
            className={`border-separate border-spacing-0 table-auto text-center w-full border-r-1 border-gray-200`}
          >
            <thead className="bg-[#E7EDF4] text-[#0D4690]">
              {customHeaderLeft ? (
                customHeaderLeft
              ) : (
                <tr className="h-12">
                  {frozenHeaders.map((header, index) => (
                    <th
                      key={index}
                      className={[
                        'p-4',
                        'text-sm',
                        'font-semibold',
                        index === 0 ? 'rounded-tl-xl' : '',
                        withHeaderColumnBorders || isRecapPtaPage
                          ? 'border border-gray-400'
                          : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              )}
            </thead>
            <tbody className="bg-white text-sm font-normal border-gray-200 text-gray-700">
              {isLoading ? (
                // Skeleton untuk kolom beku (kiri)
                <TableSkeleton
                  colCount={freezeCol}
                  rowCount={data.length || 5}
                />
              ) : (
                data?.map((item, index) => (
                  <React.Fragment key={index}>
                    {renderRowFreeze(item, index)}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Scrollable Column */}
        <div
          className="w-[60%] overflow-x-auto custom-scrollbar scroll-area scrollbar-thin"
          ref={rightTableRef}
        >
          <div className="min-w-max">
            <table className="border-separate border-spacing-0 table-auto text-center w-full">
              <thead className="bg-[#E7EDF4] text-[#0D4690]">
                {customHeaderRight ? (
                  customHeaderRight
                ) : (
                  <tr className="h-12">
                    {unfrozenHeaders.map((header, index) => (
                      <th
                        key={index}
                        className={[
                          'p-4',
                          'text-sm',
                          'font-semibold',
                          index === unfrozenHeaders.length - 1
                            ? 'rounded-tr-xl'
                            : '',
                          withHeaderColumnBorders
                            ? 'border-r border-gray-400'
                            : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                )}
              </thead>
              <tbody className="bg-white text-sm font-normal text-gray-700">
                {isLoading ? (
                  // Skeleton untuk kolom yang dapat digulir (kanan)
                  <TableSkeleton
                    colCount={unfrozenHeaders.length}
                    rowCount={data.length || 5}
                  />
                ) : (
                  data?.map((item, index) => (
                    <React.Fragment key={index}>
                      {renderRow(item, index)}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
