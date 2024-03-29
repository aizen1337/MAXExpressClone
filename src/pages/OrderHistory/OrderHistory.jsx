import { collection, onSnapshot,orderBy,query,where } from 'firebase/firestore'
import React from 'react'
import { useEffect, useState } from 'react'
import {Link, Outlet} from 'react-router-dom'
import {db} from '../../firebase/firebase';
import './orderhistory.scss'
import { useAuthentication } from '../../context/auth/AuthContext';
import OrderWidget from '../../components/ui/OrderWidget/OrderWidget';
import { motion } from 'framer-motion'
const OrderHistory = () => {
    const {currentUser} = useAuthentication();
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
    const getOrdersHistory = async () => {
        const usersOrdersHistory = query(collection(db, "orders-history"), where("orderOwner", "==", currentUser.uid), orderBy("orderTimestamp","desc"))
        onSnapshot(usersOrdersHistory, (querySnapshot) => {
            let orders = []
            querySnapshot.docs.forEach((doc) => {
                orders.push({id: doc.id, kod: doc.data().orderNumber, ...doc.data()})
            })
            setOrders(orders)
        })
    }
    useEffect(() => {
        getOrders()
        getOrdersHistory()
    })
  return (
    <>
    <motion.div className='orderhistory'
      initial={{opacity: 0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      transition={{type: 'tween'}}>
        <div className="content">
            <div className="pendingOrders">
            {   
                    pendingOrders.length > 0 ? 
                    <>
                    <h1 className='title'>Twoje oczekujące zamówienia</h1>
                    <div className='orders'>
                    {
                    pendingOrders.map((order) => (
                        <OrderWidget key={order.id} order={order} pending={true}/>
                    ))
                    }
                    </div>
                    </>
                    :
                    <h1 className='title'>Nie czekasz na żadne zamówienie <Link to="/order">Zapraszamy!</Link></h1>
            }
            </div>
            <div className="finishedOrders">
            {   
                    orders.length > 0 ? 
                    <>
                    <h1 className='title'>Twoje poprzednie zamówienia</h1>
                    <div className='orders'>
                    {
                    orders.map((order) => (
                        <OrderWidget key={order.id} order={order}/>
                    ))
                    }
                    </div>
                    </>
                    :
                    <h1>Nie złożyłeś u nas jeszcze żadnego zamówienia <Link to="/order">Zamów teraz!</Link></h1>
            } 
            </div>
        </div>
    </motion.div>
    <Outlet/>
    </>
  )
}
export default OrderHistory;