import {FiShoppingCart} from 'react-icons/fi'
import { useShoppingCart } from '../../context/shoppingcart/ShoppingCartContext';
import {Link} from 'react-router-dom'
import './shoppingcart.scss'
const ShoppingCart = () => {
    const {getShoppingCartLength} = useShoppingCart();
    const amount = getShoppingCartLength()
    return (
        <Link to="/shopping-cart">
        <div className="shoppingCart">
            <i className='shoppingCartIcon'>
                <FiShoppingCart/>
                {amount > 0 && <p className='amount'>{amount}</p>}
                </i>
        </div>
        </Link>
         );
}
 
export default ShoppingCart;