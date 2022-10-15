import {collection, onSnapshot} from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import { useEffect, useState } from 'react'
import Widget from '../../../components/ui/Widget/Widget'
import React from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import { useAuthentication } from '../../../context/auth/AuthContext'
import "../categories.scss"
import {BiLeftArrowAlt} from 'react-icons/bi'
import { Link } from 'react-router-dom'
import ShoppingCart from '../../../components/ShoppingCart/ShoppingCart'
const Desserts = () => {
    const {currentUser} = useAuthentication()
    const [desserts,setDesserts] = useState([])
    useEffect(() => {
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
    <>
    <div className="categories-content">
    <Sidebar userData={currentUser}/>
    <Link to="/order"><BiLeftArrowAlt className="arrow"/></Link>
    <ShoppingCart/>
    <div className="elements">
    { 
    desserts.map((doc) => (
        <Widget destination={doc.id} name={doc.name} imageURL={doc.photoURL} key={doc.id}/>
    )) }
    </div>
    </div>
    </> 
    );
}
 
export default Desserts;