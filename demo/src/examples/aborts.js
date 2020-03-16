import React from 'react';
import useFetch from '../../../src'

const Aborts = () => {
    const { isLoading, error, data, abortController } = useFetch('https://get.geojs.io/v1/ip/country.json?ip=8.8.8.8');

    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (isLoading) {
                console.log('aborted after 100ms');
                abortController.abort();
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [isLoading])

    if (isLoading) {
        return <p>Loading.....</p>
    }

    if (error) {
        return <p>{JSON.stringify(error)}</p>
    }

    return (
        <div>
            <p>
                {JSON.stringify(data)}
            </p>
        </div>
    )
};

export default Aborts;
