import React from 'react'
import Arrow from '../../components/ui/Arrow/Arrow'
import "./shoppingcartpage.scss";
import ShoppingCartTable from '../../components/ui/ShoppingCartTable/ShoppingCartTable';
const ShoppingCartPage = () => {
  return (
    <div className='shopping-cart-page'>
        <Arrow/>
        <div className="content">
               <ShoppingCartTable/>
        </div>
    </div>
  )
}

export default ShoppingCartPage