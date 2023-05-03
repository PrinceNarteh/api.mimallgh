export const pad = (num: string, size: number) => {
  num = num.toString();
  while (num.length < size) num = '0' + num;
  return num;
};
