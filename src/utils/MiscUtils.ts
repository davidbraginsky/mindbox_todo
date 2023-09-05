class MiscUtils {
  static dummyFunc = (): void => {};

  static getLocalStorageValue = <T>(key: string, initialValue?: T): T => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  };

  static setLocalStorageValue = <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  static removeLocalStorageItem = (key: string): void => {
    localStorage.removeItem(key);
  };
}

export default MiscUtils;
