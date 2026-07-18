export function filterArray<T>(
  array: T[],
  conditions: Partial<Record<keyof T, any>>
): T[] {
  return array.filter((item) =>
    Object.entries(conditions).every(([key, value]) => {
      if (value === undefined || value === null || value === "") return true;
      return item[key as keyof T] === value;
    })
  );
}
