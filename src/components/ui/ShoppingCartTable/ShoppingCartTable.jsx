import React, { useEffect, useState } from 'react'
import { useShoppingCart } from '../../../context/shoppingcart/ShoppingCartContext'
import {useAuthentication} from '../../../context/auth/AuthContext'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useNavigate, Link } from 'react-router-dom';
import {collection,addDoc, serverTimestamp, query, orderBy,limit, onSnapshot} from 'firebase/firestore';
import {db} from '../../../firebase/firebase'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import "./shoppingcarttable.scss";
const ShoppingCartTable = () => {
    const navigate = useNavigate();
    const {shoppingCartItems, resetShoppingCart,getShoppingCartLength, removeItem,total, setTotal} = useShoppingCart();
    const {currentUser} = useAuthentication();
    const [open, setOpen] = useState(false);
    const [orderId,setOrderId] = useState();
    const [resetOpen, setResetOpen] = useState(false);
    console.log(shoppingCartItems)
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
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
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
            orderNumber: orderId,
            orderDetails: shoppingCartItems,
            orderOwner: currentUser.uid,
            orderTimestamp: serverTimestamp()
        }).then(() => {
         setOpen(true)
            setTotal(0)  
            resetShoppingCart();
        }
         )
        .catch((error) => console.log(error))  
    }
    const resetHandler = () => {
        setTimeout(() => {
            setResetOpen(true)
            resetShoppingCart();
            setTotal(0)
            navigate('/order');
        }, 1000)
    }
    const checkoutHandler = () => {
        sendOrder()
    }
  return (
    <>
    {
        resetOpen && 
            <Alert onClose={handleClose} severity="error" sx={{ width: '80%' }}>
                <h2>Anulowano twoje zamówienie!</h2>
                <h3>Nastąpi przekierowanie...</h3>
            </Alert>
    }
        {
        getShoppingCartLength() > 0 ? 
            <>
            <div className='table'>
            {
            shoppingCartItems && shoppingCartItems.map((shoppingCartItem) => (
                <div className="shoppingCartItem" key={shoppingCartItem.id}>
                    <div className="properties">
                        <h2 className='name'>{shoppingCartItem.item.name}</h2>
                        <h2 className='price'>{shoppingCartItem.item.price},00 zł</h2>
                    </div>
                    <div className="action-buttons">
                        <div className="item" onClick={() => removeItem(shoppingCartItem.id)}>Usuń <DeleteOutlineOutlinedIcon className='icon'/></div>
                        <div className="item"><Link to={shoppingCartItem.path}  style={{
                                                                                textDecoration: 'none',
                                                                                color: 'red'}}>Szczegóły <SearchOutlinedIcon className='icon'/></Link></div>
                      
                    </div>
                    <img className="image" src={shoppingCartItem.item.photoURL} alt="Zdjęcie produktu"/>
                </div>
            ))
            }
            </div>
            </>
        : <h1 className='heading'>Twoje zamówienie wygląda na puste</h1>
     }
    { getShoppingCartLength() > 0 &&
    <div className="checkout">
     {!open ? <h1 className='price'>Wartość twojego zamówienia to {total} zł</h1> :
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            <h2>Wysłano zamówienie! Twój kod to {orderId-1}!</h2>
            <h3>Nastąpi przekierowanie...</h3>
        </Alert>
        </Snackbar>
    } 
     <div className="buttons">
        <div className="reset-button" onClick={() => resetHandler()}>
        <h6>Anuluj zamówienie <CancelOutlinedIcon/></h6>
        </div>
        <div className="checkout-button" onClick={() => checkoutHandler()}>
        <h6>Przejdź do płatności <LocalAtmOutlinedIcon/></h6>
        </div>
    </div>
    </div>
    }
    </>
  )
}


export default ShoppingCartTable