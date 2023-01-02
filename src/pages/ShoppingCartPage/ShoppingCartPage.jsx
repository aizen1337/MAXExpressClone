import React from 'react'
import Arrow from '../../components/ui/Arrow/Arrow'
import "./shoppingcartpage.scss";
import ShoppingCartTable from '../../components/ShoppingCartTable/ShoppingCartTable';
import { motion } from 'framer-motion'
const ShoppingCartPage = () => {
  return (
    <motion.div className='shopping-cart-page'
    initial={{opacity: 0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{type: 'tween'}}>
        <Arrow/>
        <div className="content">
               <ShoppingCartTable/>
        </div>
    </motion.div>
  )
}

export default ShoppingCartPage