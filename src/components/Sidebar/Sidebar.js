import React, { useState} from 'react'
import './sidebar.scss'
import UserData from './components/UserData';
import SidebarItem from './components/SidebarItem';
import { AiOutlineLogin, AiOutlineHeart} from 'react-icons/ai'
import {BiRestaurant} from 'react-icons/bi'
import {BsClockHistory} from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import { VscChromeClose } from 'react-icons/vsc'
import { useAuthentication } from '../../context/auth/AuthContext';
export default function Sidebar({userData}) {
  const {currentUser} = useAuthentication();
  const [open,setOpen] = useState(false);
  const showSidebar = () => setOpen(!open)
  return (
    <>
        <><div className={!open ? 'menu' : 'collapse'} onClick={showSidebar}>
        <i className='bars'><FaBars /></i>
      </div><div className={open ? 'menu' : 'collapse'} onClick={showSidebar}>
          <i className='bars'><VscChromeClose /></i>
        </div><div className={open ? 'sidebar' : 'collapse'}>
          {!currentUser && <SidebarItem location={"/login"} title={'Zaloguj się'} icon={<AiOutlineLogin />} />}
          <SidebarItem location={"/"} title={'Restauracje'} icon={<BiRestaurant />} />
          <SidebarItem location={"/order"} title={'Historia zamówień'} icon={<BsClockHistory />} />
          <SidebarItem location={"/"} title={'Ulubione'} icon={<AiOutlineHeart />} />
          {userData && <UserData user={userData} />}
        </div></>

    </>
  )
}
