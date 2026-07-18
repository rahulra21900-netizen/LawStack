"use client";

import { useState, useMemo } from "react";
import { searchArray } from "@/utils/search";

export function useSearch<T>(initialData: T[], keys: (keyof T)[]) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    return searchArray(initialData, query, keys);
  }, [initialData, query, keys]);

  return {
    query,
    setQuery,
    results,
  };
}
