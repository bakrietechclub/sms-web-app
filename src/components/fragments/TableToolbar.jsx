import {
  SearchIcon,
  ListFilter,
  Plus,
  ChevronRight,
  ChevronDown,
  Check,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectHasAccess } from '../../states/features/auth/authSelectors';
import { getButtonClasses } from '../../utils/styleConstants';

export const TableToolbar = ({
  searchValue,
  onSearchChange,
  onAddClick,
  addOptions = null,
  filters = null,
  onFilterSet = () => {},
  searchWidth = 'w-1/4',
  // Izin RBAC modul ini (mis. `can(PERM.AUDIENCES_CREATE)`) -- default true
  // supaya halaman yang belum di-migrasi ke usePermission tidak mendadak
  // terkunci. Dikombinasikan dengan `hasAccess` (Divisi) yang sudah ada.
  canCreate = true,
}) => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [expandedFields, setExpandedFields] = useState([]);
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [openAddSubmenu, setOpenAddSubmenu] = useState(null);
  // { [filterLabel]: value[] opsi yang dicentang }. `value` di sini adalah
  // nilai siap-pakai untuk query backend (id institusi, kode status, dst),
  // bukan sekadar label tampilan -- lihat filterOptions.js.
  const [selected, setSelected] = useState({});

  const toggleField = (fieldLabel) => {
    setExpandedFields((prev) =>
      prev.includes(fieldLabel)
        ? prev.filter((f) => f !== fieldLabel)
        : [...prev, fieldLabel],
    );
  };

  const toggleOption = (filterLabel, optionValue) => {
    setSelected((prev) => {
      const current = prev[filterLabel] || [];
      const next = current.includes(optionValue)
        ? current.filter((value) => value !== optionValue)
        : [...current, optionValue];
      return { ...prev, [filterLabel]: next };
    });
  };

  // Set opsi filter yang tersedia berubah (mis. ganti divisi/role) -> opsi
  // lama tidak relevan lagi, reset supaya tidak ada filter "hantu" yang
  // masih aktif tapi tidak terlihat di UI.
  //
  // Dependency-nya SENGAJA string turunan isi `filters`, bukan `filters`
  // itu sendiri: beberapa caller mengoper array literal inline
  // (`filters={[...]}`), yang berarti reference-nya baru tiap render ->
  // effect ini akan jalan tiap render -> setState -> render lagi -> infinite
  // loop ("Maximum update depth exceeded"). Signature string stabil selama
  // isinya (label + value tiap opsi) tidak berubah.
  const filtersSignature = (filters || [])
    .map(
      (f) => `${f.label}:${(f.options || []).map((o) => o.value).join(',')}`,
    )
    .join('|');

  useEffect(() => {
    setSelected((prev) => (Object.keys(prev).length ? {} : prev));
    onFilterSet({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersSignature]);

  const activeFilterCount = Object.values(selected).reduce(
    (sum, values) => sum + (values?.length || 0),
    0,
  );

  const handleSaveFilters = () => {
    const cleaned = Object.fromEntries(
      Object.entries(selected).filter(([, values]) => values.length > 0),
    );
    onFilterSet(cleaned);
    setShowFilterMenu(false);
  };

  const handleResetFilters = () => {
    setSelected({});
    onFilterSet({});
    setShowFilterMenu(false);
  };

  const isNestedAdd =
    typeof addOptions === 'object' && !Array.isArray(addOptions);

  const hasAccess = useSelector(selectHasAccess);

  return (
    <div className='flex items-center justify-end gap-4 mb-3 pt-4 relative'>
      {/* Search */}
      <div className={`relative ${searchWidth}`}>
        <input
          type='text'
          placeholder='Cari...'
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className='w-full p-2 pl-10 border border-gray-300 rounded-md mb-4'
        />
        <SearchIcon className='absolute left-3 top-5.5 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
      </div>

      {/* Filter */}
      {filters?.length > 0 && (
        <div className='relative'>
          <button
            className='flex gap-3 items-center border border-[#CCCCCC] text-[#999999] hover:bg-[#E6E6E6] px-4 py-2 rounded-md mb-4 ml-2 cursor-pointer'
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            aria-expanded={showFilterMenu}
          >
            <ListFilter className='w-4 h-4' />
            Filter
            {activeFilterCount > 0 && (
              <span className='inline-flex items-center justify-center min-w-5 h-5 px-1 text-xs font-semibold rounded-full bg-[#0D4690] text-white'>
                {activeFilterCount}
              </span>
            )}
          </button>

          {showFilterMenu && (
            <div className='absolute right-0 mt-2 w-[300px] bg-white shadow-2xl rounded-md z-10 text-sm py-4 px-4 max-h-[400px] overflow-auto'>
              <div className='flex items-center justify-between mb-3'>
                <p className='font-semibold'>Filter</p>
                <div className='flex items-center gap-3'>
                  {activeFilterCount > 0 && (
                    <button
                      className='text-gray-500 text-sm hover:text-gray-700 cursor-pointer'
                      onClick={handleResetFilters}
                    >
                      Reset
                    </button>
                  )}
                  <button
                    className='text-[#0D4690] text-sm font-medium hover:text-[#08326b] cursor-pointer'
                    onClick={handleSaveFilters}
                  >
                    Simpan
                  </button>
                </div>
              </div>

              <hr className='border border-gray-200 mb-3' />

              {filters.map((filter, idx) => (
                <div
                  key={idx}
                  className='mb-3'
                >
                  <button
                    className='flex justify-between items-center w-full text-left font-medium text-[#0D4690] py-1'
                    onClick={() => toggleField(filter.label)}
                  >
                    <span>
                      {filter.label}
                      {selected[filter.label]?.length > 0 && (
                        <span className='ml-1 text-xs text-gray-400 font-normal'>
                          ({selected[filter.label].length})
                        </span>
                      )}
                    </span>
                    {filter.options?.length > 0 &&
                      (expandedFields.includes(filter.label) ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      ))}
                  </button>

                  {expandedFields.includes(filter.label) &&
                    filter.options?.length > 0 && (
                      <div className='mt-1 flex flex-col gap-0.5'>
                        {filter.options.map((option, i) => {
                          const isChecked = (
                            selected[filter.label] || []
                          ).includes(option.value);
                          return (
                            <label
                              key={i}
                              className='flex items-center gap-2.5 py-1.5 px-2 -mx-2 rounded-md hover:bg-[#F5F8FC] cursor-pointer select-none transition-colors'
                            >
                              <input
                                type='checkbox'
                                checked={isChecked}
                                onChange={() =>
                                  toggleOption(filter.label, option.value)
                                }
                                className='peer sr-only'
                              />
                              <span
                                className='flex items-center justify-center w-4 h-4 shrink-0 rounded border-[1.5px] border-gray-300 bg-white transition-colors
                                  peer-checked:bg-[#0D4690] peer-checked:border-[#0D4690]
                                  peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-[#0D4690]/50'
                              >
                                <Check
                                  className='w-3 h-3 text-white'
                                  strokeWidth={3}
                                />
                              </span>
                              <span
                                className={`text-sm ${isChecked ? 'text-gray-900 font-medium' : 'text-gray-700'}`}
                              >
                                {option.label}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add */}
      {onAddClick && (
        <div className='relative'>
          <button
            onClick={
              addOptions ? () => setShowAddOptions(!showAddOptions) : onAddClick
            }
            disabled={!hasAccess || !canCreate}
            title={!canCreate ? 'Anda tidak memiliki izin untuk menambah data ini' : undefined}
            className={`${getButtonClasses('primary', !hasAccess || !canCreate)} mb-4 ml-2`}
          >
            <Plus className='w-4 h-4' />
            Tambah
          </button>

          {/* Add Dropdown */}
          {addOptions && showAddOptions && (
            <div className='absolute right-0 mt-2 bg-white shadow-2xl rounded-md z-10 text-sm py-4 px-4 w-[250px]'>
              <p className='font-base text-black mb-2'>Tambah Data</p>

              {isNestedAdd
                ? Object.keys(addOptions).map((key, idx) => (
                    <div
                      key={idx}
                      className='mb-2'
                    >
                      <button
                        onClick={() =>
                          setOpenAddSubmenu((prev) =>
                            prev === key ? null : key,
                          )
                        }
                        className='flex justify-between items-center w-full text-left font-medium text-[#0D4690] py-1'
                      >
                        <span>{key}</span>
                        {openAddSubmenu === key ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </button>

                      {openAddSubmenu === key && (
                        <div className='mt-2 ml-2 flex flex-col gap-2'>
                          {addOptions[key].map((btn, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                btn.onClick();
                                setShowAddOptions(false);
                                setOpenAddSubmenu(null);
                              }}
                              className='w-full text-left px-3 py-2 bg-[#F5F9FF] text-[#0D4690] rounded-md hover:bg-[#EAF1FC]'
                            >
                              {btn.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                : addOptions.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onAddClick(option);
                        setShowAddOptions(false);
                      }}
                      className='w-full text-left px-3 py-2 bg-[#F5F9FF] text-[#0D4690] rounded-md hover:bg-[#EAF1FC]'
                    >
                      {option}
                    </button>
                  ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
