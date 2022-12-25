import React from 'react'
import {useState,useEffect} from 'react'
import {useParams } from 'react-router-dom';
import { db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Arrow from '../../components/ui/Arrow/Arrow';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import "./orderdetails.scss";
import Checkout from '../../components/ui/Checkout/Checkout';
import TableItem from '../../components/ui/TableSlider/TableItem';
import TableSlider from '../../components/ui/TableSlider/TableSlider';
const OrderDetails = () => {
    const [data,setData] = useState()
    const {id} = useParams()
    async function singleDocument() {
        const docRef = doc(db, "orders", id);
        await getDoc(docRef)
        .then((doc) => {
            setData(doc.data({serverTimestamps: "estimate"}))
        })
        .catch((error) => console.log(error));
    }
    useEffect(() => {
        singleDocument()
    },[]) 
  return (
    <div className='order-details'>
        <Arrow/>
        <div className="content">
            <h1 className='title'>{data && data?.orderNumber}</h1>
            <h4 className='title'>Order placed {data && formatDistanceToNow(data.orderTimestamp.toDate(),{addSuffix: true})}</h4>
                 {
                data && 
                     <>
                        <TableSlider>
                            {data && data.orderDetails.map((item) => (
                                    <TableItem orderPlaced={true} item={item} key={item.id}/>
                            ))}
                        </TableSlider>
                        <Checkout orderId={id} orderData={data}/>
                    </>
                } 
        </div>
    </div>
  )
}

export default OrderDetails