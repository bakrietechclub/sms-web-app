export const BUTTON_STYLES = {
  BASE: 'rounded-md px-4 py-2 text-sm font-medium transition duration-200 shadow-sm',
  DISABLED: 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-75',
  PRIMARY_ACTIVE: 'bg-[#0D4690] text-white hover:bg-blue-800 cursor-pointer',
  DANGER_ACTIVE: 'bg-red-600 text-white hover:bg-red-700 cursor-pointer',
};

export const getButtonClasses = (variant = 'primary', isDisabled = false) => {
  const activeClass = variant === 'danger' 
    ? BUTTON_STYLES.DANGER_ACTIVE 
    : BUTTON_STYLES.PRIMARY_ACTIVE;

  const baseWithFlex = variant === 'primary' 
    ? `${BUTTON_STYLES.BASE} flex items-center gap-2` 
    : BUTTON_STYLES.BASE;

  return `
    ${baseWithFlex}
    ${isDisabled ? BUTTON_STYLES.DISABLED : activeClass}
  `;
};
