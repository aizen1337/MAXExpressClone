import React from 'react'
import { Link } from 'react-router-dom'
import './orderwidget.scss'
const OrderWidget = ({order}) => {
  return (
    <Link to={order.id} style={{
        textDecoration: 'none',
        color: 'black'
      }}>
    <div className="orderWidget">
    <div className="orderProperties">
        <h2 className='name'>{order.orderNumber}</h2>
        <h2 className='price'>{order.orderTotal},00 zł</h2>
        <p>{(order.orderTimestamp).toDate().toLocaleString('pl-PL')}</p>
    </div>
    </div>
    </Link> 
  )
}

export default OrderWidget