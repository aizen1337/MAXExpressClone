import {collection, onSnapshot} from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import { useEffect, useState } from 'react'
import Widget from '../../../components/ui/Widget/Widget'
import React from 'react'
import {Outlet, useLocation } from 'react-router-dom'
import "../categories.scss"
import Arrow from '../../../components/ui/Arrow/Arrow'
import ShoppingCart from '../../../components/ShoppingCart/ShoppingCart'
import { motion } from 'framer-motion'
const Salads = () => {
    const [salads,setSalads] = useState([])
    const documentCollection = useLocation().pathname.split("/")[1]
    useEffect(() => {
        onSnapshot(collection(db,"salads"), (snapshot) => {
            let data = []
            snapshot.forEach((doc) => {
              data.push({
                id: doc.id,
                ...doc.data()
              })
            })
            setSalads(data)
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
          { salads.map((doc) => (
        <Widget destination={doc.id} path={`/${documentCollection}/${doc.id}`} item={doc} name={doc.name} imageURL={doc.photoURL} price={doc.price} key={doc.id}/>
            )) }
          </div>
    </motion.div> 
    <Outlet/>
    </>
    );
}
 
export default Salads;