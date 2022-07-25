import React, { useState} from 'react'
import './sidebar.scss'
import maxLogo from "../../assets/logo.png";
import UserData from './components/UserData';
import SidebarItem from './components/SidebarItem';
import { AiOutlineLogin, AiOutlineHeart, AiOutlineClose } from 'react-icons/ai'
import {BiRestaurant} from 'react-icons/bi'
import {BsClockHistory} from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import { NavLink } from 'react-router-dom';
export default function Sidebar() {
  const user = {
    username: "uzytkownik",
    avatarUrl: "https://www.w3schools.com/w3images/avatar6.png"
  }
  const [open,setOpen] = useState(false);
  const showSidebar = () => setOpen(!open)
  return (
    <>
    <div className={!open ? 'menu' : 'collapse'} onClick={showSidebar}>
      <i className='bars'><FaBars/></i>
    </div>
    <div className={open ? 'sidebar' : 'collapse'}>
        <div className='close' onClick={showSidebar}><AiOutlineClose/></div>
        <NavLink to="/">
          <div className='sidebar-item-img'>
            <img src={maxLogo} className="max-logo" alt="maxlogo"/>
          </div>
        </NavLink>
        <SidebarItem location={"/login"} title={'Zaloguj się'} icon={<AiOutlineLogin/>}/>
        <SidebarItem location={"/"} title={'Restauracje'} icon={<BiRestaurant/>}/>
        <SidebarItem location={"/user/:id/orders"} title={'Historia zamówień'} icon={<BsClockHistory/>}/>
        <SidebarItem location={"/user/:id/favourite"} title={'Ulubione'} icon={<AiOutlineHeart/>}/>
        {user && <UserData user={user}/>}
    </div>
    </>
  )
}
