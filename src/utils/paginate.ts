export const paginate = (limit: number, offset: number, arr: any[]) => {
  return arr.slice(offset, offset + limit);
};
