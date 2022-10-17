import { useState } from "react";
import { Link } from "react-router-dom";
import "./widget.scss"
import { TbShoppingCartPlus, TbSearch } from 'react-icons/tb'
import Tooltip from "../Tooltip/Tooltip";
const Widget = ({name, imageURL , destination, price}) => {
  const [open,setOpen] = useState(false)
  return (
      <div className="widget" onMouseOver={() => setOpen(true)} onMouseOut={() => setOpen(false)} style={{
        backgroundImage: `url(${imageURL})`
      }}>
        <h1 className="widgetTitle">{name}</h1>
        <div className={open ? "bottom-panel" : 'hidden'}>
          <TbShoppingCartPlus className="icon"/>
            <h2 className="price">{price},00 zł</h2>
          <Tooltip tooltipContent={"Dowiedz się więcej"} child={<Link to={destination} style={{
            textDecoration: 'none'
          }}><TbSearch className="icon"/></Link>}/>
        </div>
      </div>
    );
}
 
export default Widget;
