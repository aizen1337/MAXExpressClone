import React from 'react'
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useShoppingCart } from '../../../context/shoppingcart/ShoppingCartContext'
import {useAuthentication} from '../../../context/auth/AuthContext'
import {addDoc, serverTimestamp,collection} from 'firebase/firestore'; 
import {db} from '../../../firebase/firebase'
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import "./checkout.scss";
const Checkout = ({type,orderNumber, orderId }) => {
    const {shoppingCartItems, resetShoppingCart ,total, setTotal} = useShoppingCart();
    const {currentUser} = useAuthentication();
    const [resetOpen, setResetOpen] = useState(false);
    const [open,setOpen] = useState(false)
    const [pickedUp,setPickedUp] = useState(false)
    const [complain,setComplain] = useState(false)
    const navigate = useNavigate();
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setResetOpen(false)
        setOpen(false);
      };
    const sendOrder = async () => {
        await addDoc(collection(db,"orders"), {
            orderTotal: total,
            orderNumber: orderNumber,
            orderDetails: shoppingCartItems,
            orderOwner: currentUser.uid,
            orderTimestamp: serverTimestamp(),
            orderStatus: 'pending'
        }).then(() => {
         setOpen(true)
            setTimeout(() => {
            setTotal(0)  
            resetShoppingCart();
            },3000)}
         )
        .catch((error) => console.log(error))  
    }
    const resetHandler = () => {
        setResetOpen(true)
        setTimeout(() => {
            resetShoppingCart();
            setTotal(0)
            navigate('/order');
        }, 3000)
    }
    const checkoutHandler = () => {
        sendOrder()
    }
    const pickupHandler = () => {
        setPickedUp(true)
        setTimeout(() => {
            navigate(`/success/${orderId}`)
        },3000)
    }
    const complainHandler = () => {
        setComplain(true)
        setTimeout(()=> {
            navigate(`/fail/${orderId}`)
        },3000)
    }
  return (
    <>
    { pickedUp && 
        <Snackbar open={pickedUp} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            <h2>Dziękujemy za odebranie zamówienia:)</h2>
            <h3>Zapraszamy ponownie!</h3>
        </Alert>
        </Snackbar>
    } 
        { complain && 
        <Snackbar open={complain} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            <h2>Przepraszamy za błędy związane z zamówieniem</h2>
            <h3>Nastąpi przekierowanie...</h3>
        </Alert>
        </Snackbar>
    } 
    {
        resetOpen &&
        <Snackbar open={resetOpen} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: "top", horizontal: "center" }}> 
            <Alert onClose={handleClose} severity="error" sx={{ width: '80%' }}>
                <h2>Anulowano twoje zamówienie!</h2>
                <h3>Nastąpi przekierowanie...</h3>
            </Alert>
        </Snackbar>
    }
     { open && 
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            <h2>Wysłano zamówienie! Twój kod to {orderId-1}!</h2>
            <h3>Nastąpi przekierowanie...</h3>
        </Alert>
        </Snackbar>
    } 
    <div className="checkout">
    {type === "cartCheckout" ? 
    <>
    <h1 className='price'>Wartość twojego zamówienia to {total} zł</h1>
        <div className="buttons">
            <div className="reset-button" onClick={() => resetHandler()}>
            <h6>Przerwij składanie zamówienia <CancelOutlinedIcon/></h6>
            </div>
            <div className="checkout-button" onClick={() => checkoutHandler()}>
            <h6>Przejdź do płatności <LocalAtmOutlinedIcon/></h6>
            </div>
        </div>
    </>
    :
    <>
    <div className="buttons">
        <div className="checkout-button" onClick={() => pickupHandler()}>
        <h6>Potwierdź odbiór zamówienia <LocalAtmOutlinedIcon/></h6>
        </div>
        <div className="reset-button" onClick={() => complainHandler()}>
        <h6>Zgłoś problem z zamówieniem <CancelOutlinedIcon/></h6>
        </div>
    </div>
    </>
  }
  </div>
  </>
  )
}

export default Checkout