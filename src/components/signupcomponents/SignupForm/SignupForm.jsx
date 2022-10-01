import { useRef, useState } from "react";
import { useAuthentication } from "../../../context/auth/AuthContext";
import "./signupform.scss"
import SignupButton from "../SignupButton/SignupButton"
import { FaGoogle } from "react-icons/fa";
const SignupForm = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const usernameRef = useRef()
    const {signup,signIn, authError} = useAuthentication()
    const [login,setLogin] = useState(true)
    async function handleSignup(e) {
        e.preventDefault()
        try {
            await signup(emailRef.current.value, passwordRef.current.value, usernameRef.current.value )
          }
        catch {
            throw new Error("Signing up failed")
        }
    }
    async function handleLogin(e) {
      e.preventDefault()
      try {
          await signIn(emailRef.current.value, passwordRef.current.value)
        }
        catch {
          console.log(authError)
          throw new Error("Logging in failed")
        }
    }
    return ( 
        <div className="signupComponent">
        <h2>{login ? "Signup" : "Login"}</h2>
        <form onSubmit={login ? handleSignup : handleLogin} className="signup-form">
            {login && <input type="text" className="signup-form-element" ref={usernameRef} placeholder="Your username..."/>}
            <input type="email" className="signup-form-element" ref={emailRef} placeholder="Your email..."/>
            <input type="password"  className="signup-form-element" ref={passwordRef} placeholder="Your password..."/>
            <div className="buttonDiv">
              <button type="submit" className="signup-form-submitbtn">{login ? "Signup" : "Login"} </button>
              <SignupButton icon={<FaGoogle/>}/>
            </div>
        </form>
        <button className="signup-link" onClick={() => setLogin(!login)}>{login ? "Already has an account? Login!" : "You don't have an account yet? Sign up!"}</button>
        {authError && <p className="error">{authError.code}</p>}
        </div>
     );
}
 
export default SignupForm;