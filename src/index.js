import { useState, useEffect } from 'react';

const useFetch = (url, options) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const abortController = new AbortController()
    const fetchOptions = options || {};
    
    let timeout;

    if (fetchOptions.timeout) {
      timeout = setTimeout(() => abortController.abort(), fetchOptions.timeout);
    }

    fetch(url, {...fetchOptions, signal: abortController.signal})
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
      
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      abortController.abort();
    }
  }, [url])

  return {
    isLoading,
    error,
    data
  }
};

export default useFetch;
