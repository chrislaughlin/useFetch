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
