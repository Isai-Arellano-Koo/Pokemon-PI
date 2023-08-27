import React from 'react'

const Card = ({image, name, types}) => {
  return (
    <div>
        <img src={image} alt={name}/>
        <h2>{name}</h2>
        {types.map((type) => <p>{type.name}</p>)}
    </div>
  )
}

export default Card