import React from "react"

const AlgorithmPage = ({algorithm}) => {
    return (
        <div>
            <h1>{algorithm.name}</h1>
            <p>{algorithm.description}</p>
            <p>{algorithm.output_example}</p>
            <p>{algorithm.additional_info}</p>
        </div>
    )
}

export default AlgorithmPage;