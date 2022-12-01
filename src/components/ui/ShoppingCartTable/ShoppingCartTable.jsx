import React, { useEffect } from 'react'
import { useShoppingCart } from '../../../context/shoppingcart/ShoppingCartContext'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useNavigate } from 'react-router-dom';
import "./shoppingcarttable.scss";
const ShoppingCartTable = () => {
    const navigate = useNavigate();
    const {shoppingCartItems, resetShoppingCart,getShoppingCartLength, calculateTotal, setTotal} = useShoppingCart();
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
      }
    const resetHandler = () => {
        alert("Anulowano zamówienie!");
        resetShoppingCart();
        setTotal(0)
        navigate('/order');
    }
    const checkoutHandler = () => {
        alert(`Dziękujemy za złożenie zamówienia. Kod twojego zamówienia to ${getRandomInt(7000,8000)} kwota twojego zamówienia to ${calculateTotal()} zł`)
        resetShoppingCart();
        setTotal(0)       
        navigate('/')
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
     <h1 className='price'>Wartość twojego zamówienia to {calculateTotal()} zł</h1>
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