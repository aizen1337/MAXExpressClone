import React, { useEffect, useState, useRef} from 'react'
import './sidebar.scss'
import UserData from './components/UserData';
import SidebarItem from './components/SidebarItem';
import { AiOutlineLogin, AiOutlineHistory} from 'react-icons/ai'
import {BiRestaurant} from 'react-icons/bi'
import {FaShoppingBag} from 'react-icons/fa'
import { FaBars } from 'react-icons/fa'
import { VscChromeClose } from 'react-icons/vsc'
import { useAuthentication } from '../../context/auth/AuthContext';
import { useLocation } from 'react-router-dom';
import { motion } from "framer-motion";
export default function Sidebar() {
  const {currentUser} = useAuthentication();
  const [open,setOpen] = useState(false)
  const show = {
    opacity: 1,
    delay: 0.2,
    display: "flex"
  };
  
  const hide = {
    opacity: 0,
    delay: 0.2,
    transitionEnd: {
      display: "none"
    }
  };
  let location = useLocation()
  const prevProps = useRef()
  useEffect(() => {
    prevProps.current = location;
  },[location])
  useEffect(()=> {
    if (prevProps.location !== location) {
      setOpen(false)
    }
  },[location])
  const showSidebar = () => setOpen(!open)
  return (
        <>
        <div className={!open ? 'menu' : 'collapse'} animate={!open ? show : hide}onClick={showSidebar}>
          <i className='bars'><FaBars /></i>
        </div>
        <div className={open ? 'menu' : 'collapse'}  animate={open ? show : hide} onClick={showSidebar}>
          <i className='bars'><VscChromeClose /></i>
        </div>
        <motion.div className='sidebar'  animate={open ? show : hide}>
          {!currentUser && <SidebarItem location={"/login"} title={'Zaloguj się'} icon={<AiOutlineLogin />} />}
            <SidebarItem location={"/"} title={'Strona główna'} icon={<BiRestaurant />} />
          {currentUser &&
            <>
            <SidebarItem location={"/order"} title={'Zamów'} icon={<FaShoppingBag />} />
            <SidebarItem location={"/order-history"} title={'Historia zamówień'} icon={<AiOutlineHistory />} />
            </>
          }
          {currentUser && <UserData user={currentUser} />}
        </motion.div>
        </>
  )
}
