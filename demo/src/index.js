import React from 'react'
import {render} from 'react-dom'

import useFetch from '../../src'

const Example = () => {
    const { isLoading, error, data } = useFetch('https://get.geojs.io/v1/ip/country.json?ip=8.8.8.8', { timeout: 1000 });

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
}

render(<Example/>, document.querySelector('#demo'))
