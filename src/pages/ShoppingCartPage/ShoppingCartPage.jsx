import React from 'react'
import { useAuthentication } from '../../context/auth/AuthContext'
import Sidebar from '../../components/Sidebar/Sidebar'
import "./shoppingcartpage.scss";
import ShoppingCartTable from '../../components/ui/ShoppingCartTable/ShoppingCartTable';
const ShoppingCartPage = () => {
  const {currentUser} = useAuthentication()
  return (
    <div className='shopping-cart-page'>
        <Sidebar userData={currentUser}/>
        <div className="content">
            <h1 className='title'>Twoje zamówienie:</h1>
                <ShoppingCartTable/>
          </div>
    </div>
  )
}

export default ShoppingCartPage