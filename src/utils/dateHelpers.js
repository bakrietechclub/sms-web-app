/**
 * Calculate due date by adding years to a signature date
 * @param {string} signatureDate - Date in YYYY-MM-DD format
 * @param {number|string} timePeriodYears - Number of years to add
 * @returns {string|null} - Due date in YYYY-MM-DD format or null if invalid
 */
export const calculateDueDate = (signatureDate, timePeriodYears) => {
  if (!signatureDate || !timePeriodYears) {
    return null;
  }

  const sigDate = new Date(signatureDate);
  const years = parseInt(timePeriodYears);

  if (isNaN(sigDate.getTime()) || isNaN(years) || years <= 0) {
    return null;
  }

  const dueDate = new Date(sigDate);
  dueDate.setFullYear(dueDate.getFullYear() + years);

  return dueDate.toISOString().split('T')[0];
};
