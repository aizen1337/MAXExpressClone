import { collection, onSnapshot,query,where } from 'firebase/firestore'
import React from 'react'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {db} from '../../firebase/firebase';
import Sidebar from '../../components/Sidebar/Sidebar'
import './orderhistory.scss'
import { useAuthentication } from '../../context/auth/AuthContext';
import OrderWidget from '../../components/ui/OrderWidget/OrderWidget';
const OrderHistory = () => {
    const { currentUser } = useAuthentication();
    const [orders,setOrders] = useState([]);
    const getOrders = async () => {
        const usersOrders = query(collection(db, "orders"), where("orderOwner", "==", currentUser.uid))
        onSnapshot(usersOrders, (querySnapshot) => {
            let orders = []
            querySnapshot.docs.forEach((doc) => {
                orders.push({id: doc.id, kod: doc.data().orderNumber, ...doc.data()})
            })
            setOrders(orders)
        })
    }
    useEffect(() => {
        getOrders()
    })
  return (
    <div className='orderhistory'>
        <Sidebar/>
        <div className="content">
            {   
                    orders.length > 0 ? 
                    <>
                    <h1 className='title'>Twoje zamówienia:</h1>
                    <div className='orders'>
                    {
                    orders.map((order) => (
                        <OrderWidget key={order.id} order={order}/>
                    ))
                    }
                    </div>
                    </>
                    :
                    <h1 className='title'>Nie złożyłeś jeszcze żadnego zamówienia. <Link to="/order">Zapraszamy!</Link></h1>
            }
        </div>
    </div>
  )
}

export default OrderHistory