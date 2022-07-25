import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import "./landingpage.scss"
import useFetch from '../../hooks/useFetch'
export default function LandingPage() {
  return (
    <div className='home'>
      <Sidebar/>
        <div className='container'>
        </div>
      </div>
  )
}
