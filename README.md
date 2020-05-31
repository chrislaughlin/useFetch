# useFetch

Utilizes Fetch within React to grab data from HTTP resources.

## Install

`npm install @chrislaughlin/usefetch`

## Parameters

| Term           | Definition                                                 |
|----------------|------------------------------------------------------------|
| URL            | The HTTP resource required to fetch data.                  |
| `fetchOptions` | Additional parameters or limits to specify the fetch call. |

`useFetch` is functional with standard `Fetch` options, as well as customizable options. Currently, there is only one additional option available: 

| Term      | Definition                                                                      |
|-----------|---------------------------------------------------------------------------------|
| `timeout` | A customizable number of milliseconds measured before aborting the fetch call.  |

## Requesting a fetch call with useFetch

`useFetch` is a simple function to grab data from a HTTP resource within the React web framework. To utilize `useFetch`, a URL is required. While `fetchOptions` isn't required, it is recommended to specify and customize the fetch call. Multipe `fetchOptions` can be used in one fetch call.

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

The `timeout` option can be used to abort a fetch call. `timeout` is measured in a customizable number of milliseconds that will trigger when fully counted. 

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

With React, a fetch call can be aborted by consuming another application. This is performed by using the effect hook built natively in React. 

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
## Items returned from fetch calls

There are several items which may be returned when requesting a fetch call.

| Term         | Definition                                                                              |
|--------------|-----------------------------------------------------------------------------------------|
| Data         | The content being fetched from a HTTP resource.                                         |
| Error        | States an issue with the fetch call, made when the data cannot properly load.           |
| isLoading    | Checks if the request is being loaded, as well as clearing out prior timeout functions. |
| abortConsole | Cancels the fetch call.                                                                 |
