import {collection, onSnapshot} from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import { useEffect, useState } from 'react'
import Widget from '../../../components/ui/Widget/Widget'
const Desserts = () => {
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
    <div className="categories-content">
    { 
    desserts.map((doc) => (
        <Widget destination={doc.id} name={doc.name} imageURL={doc.photoURL} key={doc.id}/>
    )) }
    </div> 
    );
}
 
export default Desserts;