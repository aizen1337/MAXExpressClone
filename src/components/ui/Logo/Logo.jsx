import logo from '../../../assets/logo.png'
import './logo.scss'
import { NavLink } from 'react-router-dom';
const Logo = () => {
    return (
      <NavLink to="/">
      <div className="logo">
        <img src={logo} alt="maxlogo"/>
      </div>
      </NavLink>
      );
}
 
export default Logo;