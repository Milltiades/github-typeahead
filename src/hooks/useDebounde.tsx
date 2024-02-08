import { useState, useEffect } from "react";

export const useDebounce = (value: any, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<any>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value]);

  return debouncedValue;
};
