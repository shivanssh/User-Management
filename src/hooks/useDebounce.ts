import { useState, useEffect } from 'react';

const useDebounce = (query: string, delay = 500) => {
  const [value, setValue] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(query);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  return value;
};

export default useDebounce;
