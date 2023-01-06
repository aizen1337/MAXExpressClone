import React from 'react'
import avatar from '../../assets/avatar.png'
import { useAuthentication } from '../../context/auth/AuthContext'
import "./accountdetails.scss"
import { useState, useRef, useEffect } from 'react'
import {VscChromeClose} from "react-icons/vsc"
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase/firebase'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const AccountDetails = () => {
  const {currentUser, updateUserEmail, resetPassword, verifyEmail, updateUsername, updateAvatar} = useAuthentication()
  const [file,setFile] = useState('');
  const [open,setOpen] = useState(false);
  const changeEmail = async(e) => {
    e.preventDefault()
    await updateUserEmail(emailRef.current.value)
  }
  const resetPasswordHandler = async() => {
    setOpen(true)
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
    <>
      {open && 
            <Snackbar open={open} autoHideDuration={1500} onClose={()=> setOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert severity="info" sx={{ width: '100%' }}>
                <h4>Wysłano wiadomość email umożliwiającą zmianę hasła</h4>
                <h5>Sprawdź swoją skrzynkę!</h5>
            </Alert>
            </Snackbar>
      }
    <div className='account-details'>
      <div className={usernamePromptOpen ? "fullscreenInput" : "disabled"}>
          <div className="cross" onClick={() => setUsernamePromptOpen(false)}>
            <i className='crossIcon'><VscChromeClose /></i>
          </div>
          <h1>Twoja nowa nazwa użytkownika: </h1>
          <form onSubmit={changeUserName}>
          <input type="text" className="textfield" ref={usernameRef} required/>
          <button type="submit" className='submitButton'>Zatwierdz</button>
          </form>
      </div>
      <div className={emailPromptOpen ? "fullscreenInput" : "disabled"}>
          <div className="cross" onClick={() => setEmailPromptOpen(false)}>
              <i className='crossIcon'><VscChromeClose /></i>
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
        <h1>Witaj, {currentUser.displayName || "nieznajomy"}</h1>
          <div className="manage-user">
            <div className='manage-user-element'>
                <p>{currentUser.displayName || "nieznajomy"}</p>
                <button className='link' onClick={() => setUsernamePromptOpen(true)}>Zmień nazwę użytkownika</button>
            </div>
            <div className='manage-user-element'>
                <p>{currentUser.email}</p>
                <button className='link' onClick={() => setEmailPromptOpen(true)}>Zmień adres email</button>
            </div>   
            <div className='manage-user-element'>
                <p>Hasło: **********</p>
                <button className='link' onClick={() => resetPasswordHandler()}>Zresetuj hasło</button>
            </div>           
            <div className='manage-user-element'>
              <p>Czy email został zweryfikowany:</p> 
              <div>{currentUser.emailVerified ? <h4>Zweryfikowany</h4> : <button className='link' onClick={verifyEmailHandler}>Zweryfikuj adres email</button>}</div>
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
    </>  
  )
}

export default AccountDetails