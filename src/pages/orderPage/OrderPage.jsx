import React from 'react'
import { AuthProvider, useAuthentication} from '../../context/auth/AuthContext'
import Sidebar from '../../components/Sidebar/Sidebar'
import CategoryWidget from '../../components/ui/CategoryWidget/CategoryWidget'
import "./orderpage.scss"
import { Outlet } from 'react-router-dom'
const OrderPage = () => {
    const { currentUser} = useAuthentication()
      return (
      <>
      <AuthProvider>
      <div className="order">
        <Sidebar userData={currentUser}/>
        <div className="container">
            <h1 className='title'>Witaj, {currentUser.displayName}. Na co masz dziś ochotę?</h1>
              <div className="categories">
              <CategoryWidget destination={"/burgers"} name={"Burgers"} imageURL={"https://firebasestorage.googleapis.com/v0/b/maxexpressapp.appspot.com/o/src%2Fburgers%2F_0003_grand-deluxe-burger-ser-i-bekon.jpg?alt=media&token=83fe6770-f8c1-4bc1-b2a3-394eee64aa72"}/>
              <CategoryWidget destination={"/desserts"} name={"Desserts"} imageURL={"https://firebasestorage.googleapis.com/v0/b/maxexpressapp.appspot.com/o/src%2Fdesserts%2F500x500_shake_mango_premium.png?alt=media&token=1fb7302a-0640-44d8-8e25-f9f5a42c2e41"}/>
              <CategoryWidget destination={"/salads"} name={"Salads"} imageURL={"https://firebasestorage.googleapis.com/v0/b/maxexpressapp.appspot.com/o/src%2Fsalads%2F1000x930_salad-bowl-chrupiacy-kurczak_2.png?alt=media&token=77136f18-6f34-49f1-89e8-03411ea2a1ef"}/>
              </div>
        </div>
      </div>
      </AuthProvider>
      <Outlet/>
      </>
  )
}

export default OrderPage