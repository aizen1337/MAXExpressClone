import React, { useEffect, useState } from 'react'
import { useShoppingCart } from '../../../context/shoppingcart/ShoppingCartContext'
import {useAuthentication} from '../../../context/auth/AuthContext'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useNavigate } from 'react-router-dom';
import {collection,addDoc, serverTimestamp} from 'firebase/firestore';
import {db} from '../../../firebase/firebase'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import "./shoppingcarttable.scss";
const ShoppingCartTable = () => {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
    const navigate = useNavigate();
    const {shoppingCartItems, resetShoppingCart,getShoppingCartLength, calculateTotal, setTotal} = useShoppingCart();
    const {currentUser} = useAuthentication();
    const [open, setOpen] = useState(false);
    const [orderId,setOrderId] = useState(0)
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
    const sendOrder = async () => {
        setOrderId(getRandomIntInclusive(7000,7999))
        const docRef = await addDoc(collection(db,"orders"), {
            orderTotal: calculateTotal(),
            orderNumber: orderId,
            orderDetails: shoppingCartItems,
            orderOwner: currentUser.uid,
            orderTimestamp: serverTimestamp()
        }).then(() => {
         setOpen(true)
         setTimeout(() => {
            setOrderId(0)
            setTotal(0)  
            resetShoppingCart();
         },5000)
        }
         )
        .catch((error) => console.log(error))  
    }
    const resetHandler = () => {
        alert("Anulowano zamówienie!");
        resetShoppingCart();
        setTotal(0)
        navigate('/order');
    }
    const checkoutHandler = () => {
        sendOrder()
    }
    console.log(shoppingCartItems)
    useEffect(() => {
        calculateTotal()
    },[])
  return (
    <>
    <div className='table'>
        {
        getShoppingCartLength() > 0 ? (
            shoppingCartItems && shoppingCartItems.map((shoppingCartItem) => (
                <div className="shoppingCartItem" key={shoppingCartItem.id}>
                    <div className="properties">
                        <h2 className='name'>{shoppingCartItem.item.name}</h2>
                        <h2 className='price'>{shoppingCartItem.item.price},00 zł</h2>
                    </div>
                    <div className="action-buttons">
                        <div className="item">Usuń <DeleteOutlineOutlinedIcon className='icon'/></div>
                        <div className="item">Szczegóły <SearchOutlinedIcon className='icon'/></div>
                      
                    </div>
                    <img className="image" src={shoppingCartItem.item.photoURL} alt="Zdjęcie produktu"/>
                </div>
            )))
        : <h1 className='heading'>Twoje zamówienie wygląda na puste</h1>
     }
    </div>
    { getShoppingCartLength() > 0 &&
    <div className="checkout">
     {!open ? <h1 className='price'>Wartość twojego zamówienia to {calculateTotal()} zł</h1> :
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            <h2>Wysłano zamówienie! Twój kod to {orderId}!</h2>
            <h3>Nastąpi przekierowanie...</h3>
        </Alert>
        </Snackbar>
    }
     <div className="buttons">
        <div className="reset-button" onClick={() => resetHandler()}>
        <h6>Anuluj zamówienie <CancelOutlinedIcon/></h6>
        </div>
        <div className="checkout-button" onClick={() => {checkoutHandler()}}>
        <h6>Przejdź do płatności <LocalAtmOutlinedIcon/></h6>
        </div>
    </div>
    </div>
    }
    </>
  )
}


export default ShoppingCartTable