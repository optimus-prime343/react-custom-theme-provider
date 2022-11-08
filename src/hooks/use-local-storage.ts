import { useCallback, useState } from "react";

type UpdateValue<TValue> = (
  newValue: TValue | ((prevValue: TValue) => TValue)
) => TValue;

export const useLocalStorage = <TValue>(key: string, initialValue: TValue) => {
  const [storedValue, setStoredValue] = useState<TValue>(() => {
    if (typeof window === "undefined") return initialValue;
    const localStorageValue = localStorage.getItem(key);
    if (!localStorageValue) return initialValue;
    return JSON.parse(localStorageValue) as TValue;
  });

  const updateValue = useCallback(
    (newValue: UpdateValue<TValue>) => {
      if (typeof window === "undefined") return;
      const valueToStore =
        typeof newValue === "function" ? newValue(storedValue) : newValue;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [key, storedValue]
  );

  return [storedValue, updateValue] as const;
};
