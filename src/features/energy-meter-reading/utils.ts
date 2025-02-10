export const calculateHourlyExport = (present: number, previous: number) => {
  return (present - previous) * 836.36;
};
