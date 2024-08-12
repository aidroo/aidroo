export const paginationCalculator = (paginationOptions) => {
  const page = Number(paginationOptions.page) || 1;
  const limit = Number(paginationOptions.limit) || 8;
  const offset = (page - 1) * limit;

  const sortBy = paginationOptions.sortBy || "createdAt";
  const sortOrder = paginationOptions.sortOrder || "desc";
  return {
    page,
    limit,
    offset,
    sortBy,
    sortOrder,
  };
};
