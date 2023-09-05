import { useState } from "react";
import MiscUtils from "@/utils/MiscUtils";

export type SetValue<T = unknown> = (value: T) => void;

function useLocalStorage<T = unknown>(key: string, initialValue?: T): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState(() => {
    return MiscUtils.getLocalStorageValue(key, initialValue);
  });

  const setValue: SetValue<T> = (value) => {
    setStoredValue(value);
    MiscUtils.setLocalStorageValue(key, value);
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
