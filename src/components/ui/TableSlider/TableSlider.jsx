import React from 'react'
import "./tableslider.scss";
const TableSlider = (props) => {
  return (
    <div className='table'>
        {props.children}
    </div>
  )
}

export default TableSlider