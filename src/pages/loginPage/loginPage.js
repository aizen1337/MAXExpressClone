import React from 'react'
import './login.scss'
import { AuthProvider} from '../../context/auth/AuthContext';
import SignupForm from '../../components/signupcomponents/SignupForm/SignupForm';
import Logo from '../../components/ui/Logo/Logo';
export default function LoginPage() {
  return (
    <AuthProvider>
      <div className='loginPage'>
      <Logo/>
      <div className='login'>
        <SignupForm/>
      </div>
      </div>
    </AuthProvider>
  )
}
