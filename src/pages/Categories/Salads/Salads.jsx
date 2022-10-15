import {collection, onSnapshot} from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import { useEffect, useState } from 'react'
import Widget from '../../../components/ui/Widget/Widget'
import React from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import { useAuthentication } from '../../../context/auth/AuthContext'
import {BiLeftArrowAlt} from 'react-icons/bi'
import { Link } from 'react-router-dom'
import "../categories.scss"
import ShoppingCart from '../../../components/ShoppingCart/ShoppingCart'
const Salads = () => {
    const [salads,setSalads] = useState([])
    const {currentUser} = useAuthentication()
    useEffect(() => {
        const saladListener = onSnapshot(collection(db,"salads"), (snapshot) => {
            let data = []
            snapshot.forEach((doc) => {
              data.push({
                id: doc.id,
                ...doc.data()
              })
              console.log(doc)
            })
            setSalads(data)
          })
    })
    return (
    <div className="categories-content">
          <Sidebar userData={currentUser}/>
          <Link to="/order"><BiLeftArrowAlt className="arrow"/></Link>
          <ShoppingCart/>
          <div className="elements">
          { salads.map((doc) => (
        <Widget destination={doc.id} name={doc.name} imageURL={doc.photoURL} key={doc.id}/>
            )) }
          </div>
    </div> 
    );
}
 
export default Salads;