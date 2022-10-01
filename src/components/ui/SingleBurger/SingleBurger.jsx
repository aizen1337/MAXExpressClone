import React from 'react'

export const SingleBurger = ({burger}) => {
  return (
    <div>
        <h1>{JSON.stringify(burger.Title)}</h1>
        <h2>{JSON.stringify(burger.Price)}</h2>
    </div>
  )
}
