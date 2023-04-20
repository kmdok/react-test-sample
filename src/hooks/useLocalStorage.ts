import { useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = (value: T | ((value: T) => T), merge?: boolean) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            const mergedValue = merge
                ? { ...storedValue, ...valueToStore }
                : valueToStore;
            setStoredValue(mergedValue);
            window.localStorage.setItem(key, JSON.stringify(mergedValue));
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue] as const;
};
