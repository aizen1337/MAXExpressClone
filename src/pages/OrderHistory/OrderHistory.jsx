import { collection, onSnapshot,orderBy,query,where } from 'firebase/firestore'
import React from 'react'
import { useEffect, useState } from 'react'
import {Link, Outlet} from 'react-router-dom'
import {db} from '../../firebase/firebase';
import Sidebar from '../../components/Sidebar/Sidebar'
import './orderhistory.scss'
import { useAuthentication } from '../../context/auth/AuthContext';
import OrderWidget from '../../components/ui/OrderWidget/OrderWidget';
const OrderHistory = () => {
    const { currentUser } = useAuthentication();
    const [orders,setOrders] = useState([]);
    const [pendingOrders,setPendingOrders] = useState([]);
    const getOrders = async () => {
        const usersOrders = query(collection(db, "orders"), where("orderOwner", "==", currentUser.uid), orderBy("orderTimestamp","desc"))
        onSnapshot(usersOrders, (querySnapshot) => {
            let orders = []
            querySnapshot.docs.forEach((doc) => {
                orders.push({id: doc.id, kod: doc.data().orderNumber, ...doc.data()})
            })
            setPendingOrders(orders)
        })
    }
    useEffect(() => {
        getOrders()
    })
  return (
    <>
    <div className='orderhistory'>
        <Sidebar/>
        <div className="content">
            <div className="pendingOrders">
            {   
                    pendingOrders.length > 0 ? 
                    <>
                    <h1 className='title'>Twoje oczekujące zamówienia</h1>
                    <div className='orders'>
                    {
                    pendingOrders.map((order) => (
                        <OrderWidget key={order.id} order={order}/>
                    ))
                    }
                    </div>
                    </>
                    :
                    <h1 className='title'>Nie złożyłeś jeszcze żadnego zamówienia. <Link to="/order">Zapraszamy!</Link></h1>
            }
            </div>
            <div className="finishedOrders">
                <h1>Nie widzę żadnego odebranego zamówienia :((</h1>
            </div>
        </div>
    </div>
    <Outlet/>
    </>
  )
}

export default OrderHistory