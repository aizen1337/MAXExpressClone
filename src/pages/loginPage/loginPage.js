import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import './login.scss'
import { AuthProvider} from '../../context/auth/AuthContext';
import SignupForm from '../../components/signupcomponents/SignupForm/SignupForm';
import Logo from '../../components/ui/Logo/Logo';
export default function LoginPage() {
  return (
    <AuthProvider>
      <div className='loginPage'>
      <Sidebar/>
      <Logo/>
      <div className='login'>
        <SignupForm/>
      </div>
      </div>
    </AuthProvider>
  )
}
