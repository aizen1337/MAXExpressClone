import { useAuthentication} from '../../context/auth/AuthContext'
import CategoryWidget from '../../components/ui/CategoryWidget/CategoryWidget'
import "./orderpage.scss"
import ShoppingCart from '../../components/ShoppingCart/ShoppingCart'
import { motion } from 'framer-motion'
import burger from '../../assets/_0003_grand-deluxe-burger-ser-i-bekon.png'
import salad from '../../assets/1000x930_salad-bowl-ser-halloumi_2-removebg-preview.png'
import shake from '../../assets/500x500_shake_mango_premium-removebg-preview.png'
const OrderPage = () => {
      const { currentUser} = useAuthentication()
      return (
      <>
      <motion.div className="order"
      initial={{opacity: 0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      transition={{type: 'tween'}}>
        <ShoppingCart/>
        <div className="container">
            <h1 className='title'>Witaj, {currentUser.displayName}. Na co masz dziś ochotę?</h1>
              <div className="categories">
              <CategoryWidget destination={"/burgers"} name={"Burgery"} imageURL={burger}/>
              <CategoryWidget destination={"/desserts"}  name={"Desery"} imageURL={shake}/>
              <CategoryWidget destination={"/salads"}   name={"Sałatki"} imageURL={salad}/>
              </div>
        </div>
      </motion.div>
      </>
  )
}

export default OrderPage