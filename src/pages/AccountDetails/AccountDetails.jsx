import React from 'react'
import avatar from '../../assets/avatar.png'
import { useAuthentication } from '../../context/auth/AuthContext'
import Sidebar from '../../components/Sidebar/Sidebar'
import "./accountdetails.scss"
import { useState, useRef } from 'react'
import {VscChromeClose} from "react-icons/vsc"
const AccountDetails = () => {
  const {currentUser, updateUserEmail, resetPassword, verifyEmail, updateUsername} = useAuthentication()
  const changeEmail = async(e) => {
    e.preventDefault()
    await updateUserEmail(emailRef.current.value)
  }
  const resetPasswordHandler = async() => {
    await resetPassword()
  }
  const changeUserName = async(e) => {
    e.preventDefault()
    await updateUsername(usernameRef.current.value)
  }
  const verifyEmailHandler = async() => {
    await verifyEmail()
    return alert("Wysłano wiadomość email z linkiem do resetowania hasła!")
  }
  const usernameRef = useRef()
  const emailRef = useRef()
  const [emailPromptOpen,setEmailPromptOpen] = useState(false)
  const [usernamePromptOpen,setUsernamePromptOpen] = useState(false)
  const [image,setImage] = useState(avatar)
  return (
    <div className='account-details'>
      <Sidebar userData={currentUser}/>
      <div className={usernamePromptOpen ? "fullscreenInput" : "disabled"}>
        <div className="menu" onClick={() => setUsernamePromptOpen(false)}>
            <i className='bars'><VscChromeClose /></i>
          </div>
          <h1>Twoja nowa nazwa użytkownika: </h1>
          <form onSubmit={changeUserName}>
          <input type="text" className="textfield" ref={usernameRef} required/>
          <button type="submit" className='submitButton'>Zatwierdz</button>
          </form>
      </div>
      <div className={emailPromptOpen ? "fullscreenInput" : "disabled"}>
          <div className="menu" onClick={() => setEmailPromptOpen(false)}>
              <i className='bars'><VscChromeClose /></i>
            </div>
            <h1>Twoj nowy email:</h1>
          <form onSubmit={changeEmail}>
          <input type="email" className="textfield" ref={emailRef} required/>
          <button type="submit" className='submitButton'>Zatwierdz</button>
          </form>
      </div>
      <div className="user-info">
        <form>
          <label htmlFor="file"><img alt="" src={currentUser ? currentUser.photoURL : image}/></label>
          <input type="file" id="file" onChange={() => {setImage(true)}} style={{"display": "none"}}/>
          <button type='submit' className={image ===! avatar || image ===! currentUser.photoURL ? 'submitButton' : "disabled"}>Change avatar</button>
        </form>
        <h1>Welcome, {currentUser.displayName || "nieznajomy"}</h1>
          <div className="manage-user">
            <div className='manage-user-element'>
                <p>Nazwa użytkownika: {currentUser.displayName || "nieznajomy"}</p>
                <button className='link' onClick={() => setUsernamePromptOpen(true)}>Zmień nazwę użytkownika</button>
            </div>
            <div className='manage-user-element'>
                <p>Email: {currentUser.email}</p>
                <button className='link' onClick={() => setEmailPromptOpen(true)}>Zmień adres email</button>
            </div>   
            <div className='manage-user-element'>
                <p>Hasło: **********</p>
                <button className='link' onClick={resetPasswordHandler}>Zresetuj hasło</button>
            </div>           
            <div className='manage-user-element'>
              <p>Czy email został zweryfikowany:</p> 
              <p>{currentUser.emailVerified ? "Zweryfikowany" : <button className='link' onClick={verifyEmailHandler}>Zweryfikuj adres email</button>}</p>
            </div>
            <div className='manage-user-element'>
              <p>Konto od: </p>
              <p>{currentUser.metadata.creationTime}</p>
            </div>
            <div className='manage-user-element'>
              <p>Ostatni raz zalogowany: </p>
              <p>{currentUser.metadata.lastSignInTime}</p>
            </div>
          </div>
      </div>
    </div>  
  )
}

export default AccountDetails