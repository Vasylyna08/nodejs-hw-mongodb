function parseType(value) {
  if (typeof value !== 'string') {
    return undefined;
  }

  const isType = (value) => ['home', 'work', 'personal'].includes(value);
  if (isType(value)) return value;
}

function parseFavourite(value) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
}

export function parseFilterParams(query) {
  const { type, isFavourite } = query;

  const parsedType = parseType(type);
  const parsedIsFavourite = parseFavourite(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
}
