import React from 'react'
import Rating from '@mui/material/Rating';
const SuccessPage = () => {
    const [value, setValue] = React.useState(0);
  return (
    <div className='successPage'>
        <div className="content">
            <h1>Dziękujemy za złożenie zamówienia w MAX!</h1>
            <div className="rating">
                <h2>Daj nam znać jak podobała się obsługa i jakość!</h2>
                    <Rating
                    value={value}
                    onChange={(event, newValue) => {
                    setValue(newValue);
                    }}
                />
            </div>
        </div>
    </div>
  )
}

export default SuccessPage