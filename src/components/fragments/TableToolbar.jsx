import { SearchIcon, ListFilter, Plus, ChevronsRight } from "lucide-react";
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
  const [showAddOptions, setShowAddOptions] = useState(false);

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
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-4.5 w-5 h-5 text-gray-400" />
      </div>

      {/* Filter */}
      {filters && (
        <div>
          <button
            className="flex gap-3 items-center border border-[#CCCCCC] text-[#999999] hover:bg-[#E6E6E6] px-4 py-2 rounded-md mb-4 ml-2 cursor-pointer"
            onClick={() => setShowFilterMenu(!showFilterMenu)}
          >
            <ListFilter className="w-4 h-4" />
            Filter
          </button>

          {showFilterMenu && (
            <div className="absolute right-44 mt-3 w-48 px-3 py-4 bg-white rounded-md shadow-2xl z-10 text-sm">
              <div className="flex items-center justify-between mb-4 mx-1">
                <p className="font-semibold">Filter</p>
                <button
                  className="text-[#0D4690] cursor-pointer"
                  onClick={onFilterSet}
                >
                  Set
                </button>
              </div>
              <hr className="border border-gray-200 mb-2" />
              <ul className="py-1">
                {filters.map((filter, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  >
                    <input type="checkbox" id={`filter-${idx}`} />
                    <label htmlFor={`filter-${idx}`}>{filter}</label>
                  </li>
                ))}
              </ul>
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
            className="flex gap-3 items-center bg-[#0D4690] text-white px-4 py-2 rounded-md mb-4 ml-2 hover:bg-[#0C3F82] duration-300"
          >
            <Plus className="w-4 h-4" />
            Tambah
          </button>

          {addOptions && showAddOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-md z-10 text-sm py-2">
              {addOptions.map((option, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setShowAddOptions(false);
                    onAddClick(option);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
