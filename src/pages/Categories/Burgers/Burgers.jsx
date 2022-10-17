import {collection, onSnapshot} from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import { useEffect, useState } from 'react'
import Widget from '../../../components/ui/Widget/Widget'
import React from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import { useAuthentication } from '../../../context/auth/AuthContext'
import {BiLeftArrowAlt} from 'react-icons/bi'
import "../categories.scss"
import { Link } from 'react-router-dom'
import ShoppingCart from '../../../components/ShoppingCart/ShoppingCart'
const Burgers = () => {
    const [burgers,setBurgers] = useState([])
    const {currentUser} = useAuthentication()
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
    <div className="categories-content">
      <Sidebar userData={currentUser}/>
      <Link to="/order"><BiLeftArrowAlt className="arrow"/></Link>
      <ShoppingCart/>
      <div className="elements">
      { burgers.map((doc) => (
          <Widget destination={doc.id} name={doc.name} imageURL={doc.photoURL} price={doc.price}key={doc.id}/>
      )) }
      </div>
    </div> 
    );
}
 
export default Burgers;