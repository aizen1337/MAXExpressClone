import { useState } from "react";
import { Link } from "react-router-dom";
import "./widget.scss"
import { TbShoppingCartPlus, TbSearch } from 'react-icons/tb'
import { useShoppingCart } from "../../../context/shoppingcart/ShoppingCartContext";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const Widget = ({name, imageURL , destination, price,item, path}) => {
  const [open,setOpen] = useState(false)
  const [alertOpen,setAlertOpen] = useState(false);
  const {addItem} = useShoppingCart();
  const addToShoppingCart = (item,path) => {
    setAlertOpen(true)
    setTimeout(()=> {
      addItem(item,path)
    },
    1000)
  }
  return (
      <>
      {
          <Snackbar open={alertOpen} autoHideDuration={1500} onClose={()=> setAlertOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert severity="success" sx={{ width: '100%' }}>
                <h4>Pomyślnie dodano {item.name} do zamówienia</h4>
            </Alert>
            </Snackbar>
      }
      <div className="widget" onMouseOver={() => setOpen(true)} onMouseOut={() => setOpen(false)} style={{
        backgroundImage: `url(${imageURL})`
      }}>
        <h1 className={!open ? "widgetTitle" : 'hidden'}>{name}</h1>
        <div className={open ? "hover-panel" : 'hidden'}>
          <div className="add-button" onClick={() => addToShoppingCart(item,path)}>
          <p>Dodaj do zamówienia</p>
          <p>{price},00 zł</p>
          </div>
          <Link className="details-button" to={destination} style={{
            textDecoration: 'none'
          }}>
          <p>Dowiedz się więcej</p>  
          <TbSearch className="icon"/>
          </Link>
        </div>
      </div>
      </>
    );
}
 
export default Widget;
