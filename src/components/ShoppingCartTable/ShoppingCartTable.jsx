import React, { useEffect, useState } from 'react'
import {collection, query, orderBy,limit, onSnapshot} from 'firebase/firestore';
import {db} from '../../firebase/firebase'
import TableItem from '../ui/TableSlider/TableItem';
import TableSlider from '../ui/TableSlider/TableSlider';
import { useShoppingCart } from '../../context/shoppingcart/ShoppingCartContext';
import Checkout from '../Checkout/Checkout';
const ShoppingCartTable = () => {
    const {getShoppingCartLength,shoppingCartItems} = useShoppingCart()
    const [orderId,setOrderId] = useState();
    useEffect(() => {
      onSnapshot(query(collection(db, "orders"), orderBy("orderNumber","desc"), limit(1)), (doc) => {
          if(doc.docs[0].data().orderNumber < 8000) {
          var highestOrderNumber =  doc.docs[0].data().orderNumber + 1
          setOrderId(highestOrderNumber)
          }
          else {
          highestOrderNumber = 7000;
          setOrderId(highestOrderNumber)
          }
      })
  },[])
  return (
    <>
        {
        getShoppingCartLength() > 0 ? 
            <>
            <TableSlider>
            {
            shoppingCartItems && shoppingCartItems.map((shoppingCartItem) => (
                <TableItem item={shoppingCartItem} key={shoppingCartItem.id} />
            ))
            }
            </TableSlider>
            </>
        : <h1 style={{
            color: 'white'
        }}>Twoje zamówienie wygląda na puste</h1>
     }
    { getShoppingCartLength() > 0 &&
        <Checkout type={"cartCheckout"} orderNumber={orderId}/>
    }
    </>
  )
}


export default ShoppingCartTable