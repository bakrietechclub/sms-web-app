import { SearchIcon, ListFilter, Plus, ChevronsRight } from "lucide-react";
import { useState } from "react";

export const TableToolbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="flex items-center justify-end gap-4 mb-3">
      <div className="relative w-1/4">
        <input
          type="text"
          placeholder="Cari..."
          className="w-full p-2 pl-10 border border-gray-300 rounded-md mb-4"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-4.5 w-5 h-5 text-gray-400" />
      </div>
      <div className="">
        <button
          className="flex gap-3 items-center border border-[#CCCCCC] text-[#999999] hover:bg-[#E6E6E6] px-4 py-2 rounded-md mb-4 ml-2 ease-in-out duration-300 cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        >
          <ListFilter className="w-4 h-4" />
          Filter
        </button>
        {showMenu && (
          <div className="absolute right-46 mt-3 w-48 px-3 py-4 bg-white b rounded-md shadow-2xl z-10 text-sm">
            <div className="flex items-center justify-between mb-4 mx-1">
              <p className="font-semibold">Filter</p>
              <button className="text-[#0D4690] cursor-pointer">Set</button>
            </div>
            <button className="text-[#1f1f1f] hover:text-[#0D4690] hover:bg-[#E7EDF4] w-full flex justify-between items-center  cursor-pointer ease-in-out duration-300 rounded-md mb-1 p-2">
              Filter
              <ChevronsRight className="w-4 h-4" />
            </button>
            <hr className="border border-gray-500" />
            <ul className="py-1">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                <input type="checkbox" id="option1" />
                <label htmlFor="option1">Option 1</label>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                <input type="checkbox" id="option2" />
                <label htmlFor="option2">Option 2</label>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                <input type="checkbox" id="option3" />
                <label htmlFor="option3">Option 3</label>
              </li>
            </ul>
          </div>
        )}
      </div>
      <button className="flex gap-3 items-center bg-[#0D4690] text-[#FFFFFF] px-4 py-2 rounded-md mb-4 ml-2 cursor-pointer hover:bg-[#0C3F82] ease-in-out duration-300">
        <Plus className="w-4 h-4" />
        Tambah
      </button>
    </div>
  );
};
export const TableToolbar2 = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="flex items-center justify-end gap-4 mb-3">
      <div className="relative w-1/4">
        <input
          type="text"
          placeholder="Cari..."
          className="w-full p-2 pl-10 border border-gray-300 rounded-md mb-4"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-4.5 w-5 h-5 text-gray-400" />
      </div>
      <div className="">
        <button
          className="flex gap-3 items-center border border-[#CCCCCC] text-[#999999] hover:bg-[#E6E6E6] px-4 py-2 rounded-md mb-4 ml-2 ease-in-out duration-300 cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        >
          <ListFilter className="w-4 h-4" />
          Filter
        </button>
        {showMenu && (
          <div className="absolute right-46 mt-3 w-48 px-3 py-4 bg-white b rounded-md shadow-2xl z-10 text-sm">
            <div className="flex items-center justify-between mb-4 mx-1">
              <p className="font-semibold">Filter</p>
              <button className="text-[#0D4690] cursor-pointer">Set</button>
            </div>
            <button className="text-[#1f1f1f] hover:text-[#0D4690] hover:bg-[#E7EDF4] w-full flex justify-between items-center  cursor-pointer ease-in-out duration-300 rounded-md mb-1 p-2">
              Filter
              <ChevronsRight className="w-4 h-4" />
            </button>
            <hr className="border border-gray-500" />
            <ul className="py-1">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                <input type="checkbox" id="option1" />
                <label htmlFor="option1">Option 1</label>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                <input type="checkbox" id="option2" />
                <label htmlFor="option2">Option 2</label>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                <input type="checkbox" id="option3" />
                <label htmlFor="option3">Option 3</label>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export const SearchBar = () => {
  return (
    <div className="relative w-1/3 flex justify-self-end z-0">
      <input
        type="text"
        placeholder="Cari..."
        className="w-full p-2 pl-10 border border-gray-300 rounded-md mb-4"
      />
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-4.5 w-5 h-5 text-gray-400" />
    </div>
  );
};
