import { useAuthentication } from "../../../context/auth/AuthContext"
const SignupButton = ({icon}) => {
    const { signupWithGoogle } = useAuthentication();
    async function handleLogin() {
      try {
        await signupWithGoogle()
      }
      catch {
        throw new Error("Signing up failed")
      }
    }   
    return (
    <div className="loginButton">
        <button className="signup-form-submitbtn" onClick={handleLogin} >Zaloguj się używając <i>{icon}</i></button>
    </div>
    );
}
 
export default SignupButton;