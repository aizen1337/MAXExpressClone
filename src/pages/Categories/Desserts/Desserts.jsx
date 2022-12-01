import {collection, onSnapshot} from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import { useEffect, useState } from 'react'
import Widget from '../../../components/ui/Widget/Widget'
import React from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import { useAuthentication } from '../../../context/auth/AuthContext'
import "../categories.scss"
import Arrow from '../../../components/ui/Arrow/Arrow'
import {Outlet } from 'react-router-dom'
import ShoppingCart from '../../../components/ShoppingCart/ShoppingCart'
const Desserts = () => {
    const {currentUser} = useAuthentication()
    const [desserts,setDesserts] = useState([])
    useEffect(() => {
         onSnapshot(collection(db,"desserts"), (snapshot) => {
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
    <>
    <div className="categories-content">
    <Sidebar userData={currentUser}/>
    <Arrow/>
    <ShoppingCart/>
    <div className="elements">
    { 
      desserts.map((doc) => (
          <Widget destination={doc.id} item={doc} name={doc.name} imageURL={doc.photoURL} price={doc.price} key={doc.id}/>
      )) }
    </div>
    </div>
    <Outlet/>
    </> 
    );
}
 
export default Desserts;