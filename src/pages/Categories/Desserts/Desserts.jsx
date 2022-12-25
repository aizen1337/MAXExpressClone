import {collection, onSnapshot} from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import { useEffect, useState } from 'react'
import Widget from '../../../components/ui/Widget/Widget'
import React from 'react'
import "../categories.scss"
import Arrow from '../../../components/ui/Arrow/Arrow'
import {Outlet, useLocation } from 'react-router-dom'
import ShoppingCart from '../../../components/ShoppingCart/ShoppingCart'
const Desserts = () => {
    const [desserts,setDesserts] = useState([])
    const documentCollection = useLocation().pathname.split("/")[1]
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
    <Arrow/>
    <ShoppingCart/>
    <div className="elements">
    { 
      desserts.map((doc) => (
        <Widget destination={doc.id} path={`/${documentCollection}/${doc.id}`} name={doc.name} imageURL={doc.photoURL} price={doc.price} item={doc} key={doc.id}/>
      )) }
    </div>
    </div>
    <Outlet/>
    </> 
    );
}
 
export default Desserts;