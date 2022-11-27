import React from 'react'
import { useAuthentication } from '../../context/auth/AuthContext'
import { useShoppingCart } from '../../context/shoppingcart/ShoppingCartContext';
import Sidebar from '../../components/Sidebar/Sidebar'
import Widget from '../../components/ui/Widget/Widget';
import "./shoppingcartpage.scss";
const ShoppingCartPage = () => {
  const {currentUser} = useAuthentication()
  const {shoppingCartItems,removeItems} = useShoppingCart()  
  return (
    <div className='shopping-cart-page'>
        <Sidebar userData={currentUser}/>
        <div className="content">
        <h1 className='title'>Twoje zamówienie:</h1>
            {shoppingCartItems && shoppingCartItems.map((item) => (
                <div className="item" key={item.id}>
                    <h1>{item.item.name}</h1>
                    <p>{item.id}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ShoppingCartPage