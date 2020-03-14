import { useState, useEffect } from 'react';

const useFetch = (url, options) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url, options || {})
        .then(res => res.json())
        .then(response => {
          setData(response);
          setIsLoading(false);
          setError(null);
        })
        .catch(error => {
          setData(null);
          setIsLoading(false);
          setError(error);
        })
  }, [url, options])

  return {
    isLoading,
    error,
    data
  }
};

export default useFetch;
