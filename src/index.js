import {
  useState,
  useEffect,
  useRef,
} from 'react';

const useFetch = (url, options) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const abortControllerRef = useRef();

  useEffect(() => {

    abortControllerRef.current = new AbortController();

    setIsLoading(true);

    const fetchOptions = options || {};
    
    let timeout;

    if (fetchOptions.timeout) {
      timeout = setTimeout(() => abortControllerRef.current.abort(), fetchOptions.timeout);
    }

    fetch(url, {...fetchOptions, signal: abortControllerRef.current.signal})
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
      
      abortControllerRef.current.abort();
    }
  }, [url])

  return {
    isLoading,
    error,
    data,
    abortController: abortControllerRef.current,
  }
};

export default useFetch;
