// src/utils/monthOptions.ts

export const generateMonthOptions = (startYear = 2025, endYear = 2030) => {
  const options: { value: string; label: string }[] = [];

  for (let year = startYear; year <= endYear; year++) {
    for (let month = 0; month < 12; month++) {
      const date = new Date(year, month);
      const value = `${year}-${String(month + 1).padStart(2, '0')}`;
      const label = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      options.push({ value, label });
    }
  }

  return options;
};
