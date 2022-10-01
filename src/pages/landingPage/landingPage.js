import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Logo from '../../components/ui/Logo/Logo'
import "./landingpage.scss"
import { useAuthentication } from '../../context/auth/AuthContext';
export default function LandingPage() {
  const {currentUser} = useAuthentication()
  return (
    <div className='home'>
      <Sidebar userData={currentUser}/>
      <div className='logo'><Logo/></div>
        <div className='container'>
          <div className='burgers'>
            Welcome at MAX
          </div>
        </div>
      </div>
  )
}
