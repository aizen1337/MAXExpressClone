import React, {useState } from 'react'
import { AuthProvider, useAuthentication} from '../../context/auth/AuthContext'
import Sidebar from '../../components/Sidebar/Sidebar'
import Widget from '../../components/ui/Widget/Widget'
import "./orderpage.scss"
import {collection, onSnapshot} from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { useEffect } from 'react'
const OrderPage = () => {
    const { currentUser} = useAuthentication()
    const [burgers,setBurgers] = useState([])
    const [salads,setSalads] = useState([])
    const [desserts,setDesserts] = useState([])
    useEffect(() => {
      const burgerListener = onSnapshot(collection(db,"burgers"), (snapshot) => {
        let data = []
        snapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data()
          })
          console.log(doc)
        })
        setBurgers(data)
      })
      const saladsListener = onSnapshot(collection(db,"salads"), (snapshot) => {
        let data = []
        snapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data()
          })
        })
        setSalads(data)
      })
      const dessertsListener = onSnapshot(collection(db,"desserts"), (snapshot) => {
        let data = []
        snapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data()
          })
        })
        setDesserts(data)
      })
    })
      return (
      <AuthProvider>
      <div className="order">
        <Sidebar userData={currentUser}/>
        <div className="container">
            <h1 className='title'>Witaj, {currentUser.displayName}. Na co masz dziś ochotę?</h1>
            <div className="order--content">
                { burgers.map((doc) => (
                  <Widget name={doc.name} price={doc.Price} key={doc.id}/>
                )) }
                 { salads.map((doc) => (
                  <Widget name={doc.name} price={doc.price} key={doc.id}/>
                ))}
                  {desserts.map((doc) => (
                  <Widget name={doc.name} price={doc.price} key={doc.id}/>
                ))}
            </div>
        </div>
      </div>
      </AuthProvider>
  )
}

export default OrderPage