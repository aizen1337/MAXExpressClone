import { useState } from "react";
import { Link } from "react-router-dom";
import "./widget.scss"
import { TbShoppingCartPlus, TbSearch } from 'react-icons/tb'
import Tooltip from "../Tooltip/Tooltip";
import { useShoppingCart } from "../../../context/shoppingcart/ShoppingCartContext";
const Widget = ({name, imageURL , destination, price,item}) => {
  const [open,setOpen] = useState(false)
  const {addItem} = useShoppingCart();
  const addToShoppingCart = (item) => {
    alert("Dodano do zamówienia!")
    addItem(item)
  }
  return (
      <div className="widget" onMouseOver={() => setOpen(true)} onMouseOut={() => setOpen(false)} style={{
        backgroundImage: `url(${imageURL})`
      }}>
        <h1 className={!open ? "widgetTitle" : 'hidden'}>{name}</h1>
        <div className={open ? "bottom-panel" : 'hidden'}>
          <h6 onClick={() => addToShoppingCart(item)}>
          Dodaj do zamówienia
          <TbShoppingCartPlus className="icon" />
          </h6>
            <h2 className="price">{price},00 zł</h2>
          <Tooltip tooltipContent={"Dowiedz się więcej"} child={<Link to={destination} style={{
            textDecoration: 'none'
          }}><TbSearch className="icon"/></Link>}/>
        </div>
      </div>
    );
}
 
export default Widget;
