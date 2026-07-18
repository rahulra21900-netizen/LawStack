export function searchArray<T>(
  array: T[],
  query: string,
  keys: (keyof T)[]
): T[] {
  if (!query) return array;
  const lowercaseQuery = query.toLowerCase();
  return array.filter((item) =>
    keys.some((key) => {
      const value = item[key];
      if (typeof value === "string") {
        return value.toLowerCase().includes(lowercaseQuery);
      }
      return false;
    })
  );
}
