import {collection, onSnapshot} from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import { useEffect, useState } from 'react'
import Widget from '../../../components/ui/Widget/Widget'
import React from 'react'
const Salads = () => {
    const [salads,setSalads] = useState([])
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
    { salads.map((doc) => (
        <Widget destination={doc.id} name={doc.name} imageURL={doc.photoURL} key={doc.id}/>
    )) }
    </div> 
    );
}
 
export default Salads;