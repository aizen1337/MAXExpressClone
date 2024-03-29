import {collection, onSnapshot} from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import { useEffect, useState } from 'react'
import Widget from '../../../components/ui/Widget/Widget'
import React from 'react'
import "../categories.scss"
import Arrow from '../../../components/ui/Arrow/Arrow'
import {Outlet, useLocation } from 'react-router-dom'
import ShoppingCart from '../../../components/ShoppingCart/ShoppingCart'
import { motion } from 'framer-motion'
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
    <motion.div className="categories-content"
      initial={{opacity: 0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      transition={{type: 'tween'}}>
    <Arrow/>
    <ShoppingCart/>
    <div className="elements">
    { 
      desserts.map((doc) => (
        <Widget destination={doc.id} path={`/${documentCollection}/${doc.id}`} name={doc.name} imageURL={doc.photoURL} price={doc.price} item={doc} key={doc.id}/>
      )) }
    </div>
    </motion.div>
    <Outlet/>
    </> 
    );
}
 
export default Desserts;