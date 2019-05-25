import React from 'react'

export default function Movie(props){
    return (
        <div className="movie">
            <figure>
            <img src={props.cover} alt="Capa do filme" />
            </figure>
        </div>
    )
}