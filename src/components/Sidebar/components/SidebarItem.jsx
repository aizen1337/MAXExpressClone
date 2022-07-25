import { NavLink } from 'react-router-dom';
var linkStyle = {
    textDecoration: "none",
    fontWeight: 500,
    textShadow: "0px 1px 5px rgba(249, 0, 49, 1)",
    backgroundColor: "rgba(0, 0, 0, 0.1)"
    }
const SidebarItem = ({title,location,icon}) => {
    return (         
    <NavLink className='link-style' to={location} style={
    ({isActive}) => 
    isActive ? linkStyle : undefined
    }
  >
  <div className='sidebar-item'>
    <p className='sidebar-item-element'>{title}</p>
    <i className='sidebar-item-element'>{icon}</i>
  </div>
  </NavLink> );
}
 
export default SidebarItem;