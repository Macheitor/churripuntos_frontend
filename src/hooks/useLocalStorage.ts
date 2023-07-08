import { useEffect, useState } from "react";

const useLocalStorage = (storageKey: string, fallbackState: string) => {
  const [value, setValue] = useState(
    localStorage.getItem(storageKey) ?? fallbackState
  );

  useEffect(() => {
    localStorage.setItem(storageKey, value);
  }, [value, storageKey]);

  return [value, setValue];
};

export default useLocalStorage;
