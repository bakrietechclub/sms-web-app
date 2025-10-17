import { useSelector } from 'react-redux';

const hasAccess = useSelector(selectHasAccess);

const disabledClasses =
  'bg-gray-300 text-gray-500 cursor-not-allowed opacity-75';

// 2. Tombol Perbarui (New button - Primary)
const updateButtonClasses = `
        rounded-md px-4 py-2 transition duration-300 shadow-sm
        ${
          !hasAccess
            ? disabledClasses
            : 'bg-[#0D4690] text-white hover:bg-blue-800 cursor-pointer'
        }
    `;

// 3. Tombol Hapus (New button - Destructive)
const deleteButtonClasses = `
        rounded-md px-4 py-2 transition duration-300 shadow-sm
        ${
          !hasAccess
            ? disabledClasses
            : 'bg-red-600 text-white hover:bg-red-700 cursor-pointer'
        }
    `;

export { updateButtonClasses, deleteButtonClasses };
