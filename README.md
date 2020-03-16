# useFetch

A quick and easy hook for using Fetch with React.

## Install

`npm install @chrislaughlin/usefetch`

## Usage

```jsx
import useFetch from '@chrislaughlin/usefetch'

const Example = () => {
    
    const {
        isLoading,
        error,
        data
    } = useFetch('https://get.geojs.io/v1/ip/country.json?ip=8.8.8.8', fetchOptions)

    if (isLoading) {
        return <p>Loading.....</p>
    }

    if (error) {
        return <p>{JSON.stringify(error)}</p>
    }

    return (
        <p>
            {JSON.stringify(data)}
        </p>
    )
}

```

### Aborting a request via custom timeout

```jsx
import useFetch from '@chrislaughlin/usefetch'

const CustomTimeout = () => {
    const { isLoading, error, data } = useFetch('https://get.geojs.io/v1/ip/country.json?ip=8.8.8.8', {timeout: 1000});

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
```

### Aborting a request via consuming application

```jsx
import useFetch from '@chrislaughlin/usefetch'

const AbortExample = () => {
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
```
