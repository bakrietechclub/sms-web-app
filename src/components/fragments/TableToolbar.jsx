import {
  SearchIcon,
  ListFilter,
  Plus,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

export const TableToolbar = ({
  searchValue,
  onSearchChange,
  onAddClick,
  addOptions = null,
  filters = null,
  onFilterSet = () => {},
  searchWidth = "w-1/4",
}) => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [expandedFields, setExpandedFields] = useState([]);
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [openAddSubmenu, setOpenAddSubmenu] = useState(null);

  const toggleField = (fieldLabel) => {
    setExpandedFields((prev) =>
      prev.includes(fieldLabel)
        ? prev.filter((f) => f !== fieldLabel)
        : [...prev, fieldLabel]
    );
  };

  const isNestedAdd =
    typeof addOptions === "object" && !Array.isArray(addOptions);

  return (
    <div className="flex items-center justify-end gap-4 mb-3 pt-4 relative">
      {/* Search */}
      <div className={`relative ${searchWidth}`}>
        <input
          type="text"
          placeholder="Cari..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full p-2 pl-10 border border-gray-300 rounded-md mb-4"
        />
        <SearchIcon className="absolute left-3 top-5.5 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      {/* Filter */}
      {filters?.length > 0 && (
        <div className="relative">
          <button
            className="flex gap-3 items-center border border-[#CCCCCC] text-[#999999] hover:bg-[#E6E6E6] px-4 py-2 rounded-md mb-4 ml-2 cursor-pointer"
            onClick={() => setShowFilterMenu(!showFilterMenu)}
          >
            <ListFilter className="w-4 h-4" />
            Filter
          </button>

          {showFilterMenu && (
            <div className="absolute right-0 mt-2 w-[300px] bg-white shadow-2xl rounded-md z-10 text-sm py-4 px-4 max-h-[400px] overflow-auto">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold">Filter</p>
                <button
                  className="text-[#0D4690] text-sm font-medium hover:text-[#08326b] cursor-pointer"
                  onClick={() => {
                    onFilterSet();
                    setShowFilterMenu(false);
                  }}
                >
                  Simpan
                </button>
              </div>

              <hr className="border border-gray-200 mb-3" />

              {filters.map((filter, idx) => (
                <div key={idx} className="mb-3">
                  <button
                    className="flex justify-between items-center w-full text-left font-medium text-[#0D4690] py-1"
                    onClick={() => toggleField(filter.label)}
                  >
                    <span>{filter.label}</span>
                    {filter.options?.length > 0 &&
                      (expandedFields.includes(filter.label) ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      ))}
                  </button>

                  {expandedFields.includes(filter.label) &&
                    filter.options?.length > 0 && (
                      <div className="mt-2 ml-2 flex flex-col gap-2">
                        {filter.options.map((option, i) => (
                          <label
                            key={i}
                            className="flex items-center gap-2 text-gray-700"
                          >
                            <input type="checkbox" value={option.value} />
                            {option.label}
                          </label>
                        ))}
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
        <div className="relative">
          <button
            onClick={
              addOptions ? () => setShowAddOptions(!showAddOptions) : onAddClick
            }
            className="flex gap-3 items-center bg-[#0D4690] text-white px-4 py-2 rounded-md mb-4 ml-2 hover:bg-[#0C3F82] duration-300 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Tambah
          </button>

          {/* Add Dropdown */}
          {addOptions && showAddOptions && (
            <div className="absolute right-0 mt-2 bg-white shadow-2xl rounded-md z-10 text-sm py-4 px-4 w-[250px]">
              <p className="font-base text-black mb-2">Tambah Data</p>

              {isNestedAdd
                ? Object.keys(addOptions).map((key, idx) => (
                    <div key={idx} className="mb-2">
                      <button
                        onClick={() =>
                          setOpenAddSubmenu((prev) =>
                            prev === key ? null : key
                          )
                        }
                        className="flex justify-between items-center w-full text-left font-medium text-[#0D4690] py-1"
                      >
                        <span>{key}</span>
                        {openAddSubmenu === key ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </button>

                      {openAddSubmenu === key && (
                        <div className="mt-2 ml-2 flex flex-col gap-2">
                          {addOptions[key].map((btn, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                btn.onClick();
                                setShowAddOptions(false);
                                setOpenAddSubmenu(null);
                              }}
                              className="w-full text-left px-3 py-2 bg-[#F5F9FF] text-[#0D4690] rounded-md hover:bg-[#EAF1FC]"
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
                      className="w-full text-left px-3 py-2 bg-[#F5F9FF] text-[#0D4690] rounded-md hover:bg-[#EAF1FC]"
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
