import React from 'react'
import avatar from '../../assets/avatar.png'
import { useAuthentication } from '../../context/auth/AuthContext'
import Sidebar from '../../components/Sidebar/Sidebar'
import "./accountdetails.scss"
import { useState, useRef, useEffect } from 'react'
import {VscChromeClose} from "react-icons/vsc"
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase/firebase'
const AccountDetails = () => {
  const {currentUser, updateUserEmail, resetPassword, verifyEmail, updateUsername, updateAvatar} = useAuthentication()
  const [file,setFile] = useState('');
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
  }
  const usernameRef = useRef()
  const emailRef = useRef()
  const [emailPromptOpen,setEmailPromptOpen] = useState(false)
  const [usernamePromptOpen,setUsernamePromptOpen] = useState(false)
  useEffect(() => {
    const uploadFile = () =>{
        const storageRef = ref(storage,file.name)
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            default:
                throw new Error(snapshot.state)
            }
         
            
        }, 
        (error) => {
          console.log(error)
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                updateAvatar(downloadURL)
            });
            
        }
        ); 
                }
                file && uploadFile();
})
  return (
    <div className='account-details'>
      <Sidebar/>
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
          <label htmlFor="file"><img alt="" src={file ? URL.createObjectURL(file) : currentUser.photoURL || avatar}/></label>
          <input type="file" id="file" onChange={e =>setFile(e.target.files[0])} style={{"display": "none"}}/>
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
              <p>{currentUser.emailVerified ? <h4>Zweryfikowany</h4> : <button className='link' onClick={verifyEmailHandler}>Zweryfikuj adres email</button>}</p>
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