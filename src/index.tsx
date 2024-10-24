import { useState, useEffect } from 'react';

// check ui is on the client (CSR)
const isClient = typeof window !== 'undefined';

function useStateQueryParams<T extends object>(
  defaultValues: Partial<T> = {}
): [T, (value: Partial<T>) => void] {
  const getQueryParams = (): T => {
    if (!isClient) return { ...defaultValues } as T;

    const params = new URLSearchParams(window.location.search);
    const result = { ...defaultValues } as T;

    params.forEach((value, key) => {
      try {
        result[key as keyof T] = JSON.parse(value);
      } catch {
        (result[key as keyof T] as any) = value;
      }
    });

    return result;
  };

  // Initialize state with the query parameters or default values
  const [state, setState] = useState<T>(getQueryParams);

  const setQueryParams = (newValues: Partial<T>) => {
    if (!isClient) return;

    const params = new URLSearchParams(window.location.search);

    Object.keys(newValues).forEach((key) => {
      const value = newValues[key as keyof T];
      if (value !== undefined) {
        params.set(key, typeof value === 'string' ? value : JSON.stringify(value));
      }
    });

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, '', newUrl);

    setState((prevState) => ({
      ...prevState,
      ...newValues,
    }));
  };

  // Sync state when the URL changes (e.g., via back/forward browser buttons)
  useEffect(() => {
    const handlePopState = () => {
      setState(getQueryParams());
    };

    if (isClient) {
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      if (isClient) {
        window.removeEventListener('popstate', handlePopState);
      }
    };
  }, []);

  return [state, setQueryParams];
}

export default useStateQueryParams;
