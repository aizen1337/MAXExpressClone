import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import './login.scss'
export default function LoginPage() {
  return (
    <div className='login'>
      <Sidebar/>
      <div className='container'>
        <form>
          <input type="text"/>
        </form>
      </div>
    </div>
  )
}
