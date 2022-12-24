import React from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { Link } from 'react-router-dom'
import { useShoppingCart } from '../../../context/shoppingcart/ShoppingCartContext'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react'
import "./tableslider.scss";
const TableItem = ({item, orderPlaced}) => {
    const [open,setOpen] = useState(false)
    const {removeItem} = useShoppingCart();
    const removeHandler = (item) => {
      setOpen(true)
      setTimeout(() =>
      removeItem(item.id)
      ,1000)
    }
  return (
    <>
    {
      <Snackbar open={open} autoHideDuration={1500} onClose={()=> setOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity="info" sx={{ width: '100%' }}>
            <h4>Usunięto {item.item?.name} z zamówienia!</h4>
        </Alert>
        </Snackbar>
  }
    <div className="table-item">
    <div className="item-properties">
        <h4 className='name'>{item.item?.name}</h4>
        <h4 className='price'>{item.item?.price},00 zł</h4>
    </div>
    {!orderPlaced && 
    <div className="action-buttons">
        <div className="button" onClick={() => removeHandler(item)}>Usuń <DeleteOutlineOutlinedIcon className='icon'/></div>
            <div className="button">
            <Link to={item?.path}  style={{
            textDecoration: 'none',
            color: 'red'}}>Szczegóły <SearchOutlinedIcon className='icon'/>
            </Link>
        </div>
    </div>
    }
    <img className="image" src={item.item?.photoURL} alt="Zdjęcie produktu"/>
</div>
</>
  )
}

export default TableItem