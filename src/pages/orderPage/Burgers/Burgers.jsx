import {collection, onSnapshot} from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import { useEffect, useState } from 'react'
import Widget from '../../../components/ui/Widget/Widget'
const Burgers = () => {
    const [burgers,setBurgers] = useState([])
    useEffect(() => {
        const burgerListener = onSnapshot(collection(db,"burgers"), (snapshot) => {
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
    { burgers.map((doc) => (
        <Widget destination={doc.id} name={doc.name} imageURL={doc.photoURL} key={doc.id}/>
    )) }
    </div> 
    );
}
 
export default Burgers;