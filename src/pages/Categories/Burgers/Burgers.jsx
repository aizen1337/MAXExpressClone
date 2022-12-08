import {collection, onSnapshot} from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import { useEffect, useState } from 'react'
import Widget from '../../../components/ui/Widget/Widget'
import React from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import Arrow from '../../../components/ui/Arrow/Arrow'
import "../categories.scss"
import {Outlet } from 'react-router-dom'
import ShoppingCart from '../../../components/ShoppingCart/ShoppingCart'
const Burgers = () => {
    const [burgers,setBurgers] = useState([])
    useEffect(() => {
        onSnapshot(collection(db,"burgers"), (snapshot) => {
            let data = []
            snapshot.forEach((doc) => {
              data.push({
                id: doc.id,
                ...doc.data()
              })
            })
            setBurgers(data)
          })
    })
    return (
    <>
    <div className="categories-content">
      <Sidebar/>
      <Arrow/>
      <ShoppingCart/>
      <div className="elements">
      { burgers.map((doc) => (
          <Widget destination={doc.id} name={doc.name} imageURL={doc.photoURL} price={doc.price} item={doc} key={doc.id}/>
      )) }
      </div>
    </div>  
    <Outlet/>
    </> 
    );
}
 
export default Burgers;