import { useEffect, useRef, useState } from "react";
import { useAuthentication } from "../../../context/auth/AuthContext";
import "./signupform.scss"
import SignupButton from "../SignupButton/SignupButton"
import { FaGoogle } from "react-icons/fa";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Snackbar } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
const SignupForm = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const usernameRef = useRef()
    const {signup,signIn, authError} = useAuthentication()
    const [errorCode,setErrorCode] = useState(null);
    const [login,setLogin] = useState(true)
    const [open,setOpen] = useState(false);
    async function handleSignup(e) {
        e.preventDefault()
       await signup(emailRef.current.value, passwordRef.current.value, usernameRef.current.value )
    }
    async function handleLogin(e) {
      e.preventDefault()
          await signIn(emailRef.current.value, passwordRef.current.value)
    }
    useEffect(() => {
        if(authError) {
        switch(authError) {
            case 'auth/email-already-exists':
              setErrorCode("Konto z tym emailem już istnieje");
              setOpen(true);
              break;
            case 'auth/internal-error':
              setErrorCode("Błąd serwera, przepraszamy!");
              setOpen(true);
              break;
            case 'auth/invalid-password':
              setErrorCode("Nieprawidłowe hasło");
              setOpen(true);
            break;
            case 'auth/invalid-email':
              setErrorCode("Nieprawidłowy e-mail");
              setOpen(true);
            break;
            case 'auth/user-not-found':
              setErrorCode('Nie znaleziono użytkownika');
              setOpen(true);
              break;
            default:
              setErrorCode();
              break;
          }
        }
    },[authError])
      return ( 
      <>
        {authError &&  
        <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center' }} open={open} onClose={() => !open} autoHideDuration={3000}>
        <Alert severity="error">
          <AlertTitle>Błąd!</AlertTitle>
          Wystąpił błąd! — <strong>{errorCode}</strong>
          <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={() => setOpen(false)}
          ><CloseIcon/></IconButton>
        </Alert>
        </Snackbar>
        }
        <div className="signupComponent">
        <h2>{login ? "Zarejestruj się!" : "Zaloguj się!"}</h2>
        <form onSubmit={login ? handleSignup : handleLogin} className="signup-form">
            {login && <input type="text" className="signup-form-element" ref={usernameRef} placeholder="Twój login..." required/>}
            <input type="email" className="signup-form-element" ref={emailRef} placeholder="Twój email..." required/>
            <input type="password"  className="signup-form-element" ref={passwordRef} placeholder="Twoje hasło..." required/>
            <div className="buttonDiv">
              <button type="submit" className="signup-form-submitbtn">{login ? "Zarejestruj się!" : "Zaloguj się!"} </button>
              <SignupButton icon={<FaGoogle/>}/>
            </div>
        </form>
        <button className="signup-link" onClick={() => setLogin(!login)}>{login ? "Masz już konto? Zaloguj się!" : "Nie masz jeszcze konta? Zarejestruj się!"}</button>
        </div>
      </>
     );
}
 
export default SignupForm;