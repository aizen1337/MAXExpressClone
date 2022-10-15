import { useState } from "react";
import { Link } from "react-router-dom";
import "./widget.scss"
import { TbShoppingCartPlus, TbSearch } from 'react-icons/tb'
const Widget = ({name, imageURL , destination}) => {
  const [open,setOpen] = useState(false)
  return (
    <Link to={destination} style={{
      textDecoration: 'none'
    }}>
      <div className="widget" onMouseOver={() => setOpen(true)} onMouseOut={() => setOpen(false)} style={{
        backgroundImage: `url(${imageURL})`
      }}>
        <h1 className="widgetTitle">{name}</h1>
        <div className={open ? "bottom-panel" : 'hidden'}>
          <TbShoppingCartPlus className="icon"/>
          <TbSearch className="icon"/>
        </div>
      </div>
    </Link>
    );
}
 
export default Widget;
