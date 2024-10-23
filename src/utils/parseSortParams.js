import { SORT_ORDER } from '../constants/index.js';

const parseSortOrder = (sortOder) => {
  if (typeof sortOder !== 'string') {
    return SORT_ORDER.ASC;
  }

  if ([SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOder) !== true) {
    return SORT_ORDER.ASC;
  }
  return sortOder;
};

const parseSortBy = (sortBy) => {
  if (typeof sortBy !== 'string') {
    return '_id';
  }

  const keys = ['name'];

  if (keys.includes(sortBy) !== true) {
    return '_id';
  }
  return sortBy;
};

export const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;

  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
