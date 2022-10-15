import {FiShoppingCart} from 'react-icons/fi'
import './shoppingcart.scss'
const ShoppingCart = () => {
    return (
        <div className="shoppingCart">
            <i className='shoppingCartIcon'>
                <FiShoppingCart/>
                <p className='amount'>5</p>
                </i>
        </div>
         );
}
 
export default ShoppingCart;