export const formatBytesToGB = (bytes: number): number => {
  const gb = bytes / 1024 ** 3;
  return Math.round(gb * 10) / 10;
};
