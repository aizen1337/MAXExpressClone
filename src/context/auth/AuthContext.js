import { createContext, useContext,useState, useEffect} from "react";
import { auth, provider } from "../../firebase/firebase";
import { signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateEmail, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
export function AuthProvider({children}) {
    const redirect = useNavigate()
    const [currentUser,setCurrentUser] = useState()
    const [authError,setAuthError] = useState()
    async function signupWithGoogle() {
        await signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                setCurrentUser(user);
                redirect("/order")
            }).catch((error) => {
                console.log(error)
                setAuthError(error)
            });
    }
    async function signup(email, password, username) {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                setCurrentUser(user);
                user.displayName = username
                redirect("/order")
            }).catch((error) => {
                console.log(error)
                setAuthError(error)
            });
    }
    async function signIn(email, password) {
        await signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                setCurrentUser(user);
                redirect("/order")
            }).catch((error) => {
                console.log(error)
                setAuthError(error)
            });
    }
    async function logOut() {
        await signOut(auth)
        .then(() => {
            setCurrentUser(null)
            redirect("/")
        })
        .catch((error) => {
            console.log(error)
            setAuthError(error)
        })
    }
    async function updateUserEmail(newEmail) {
        await updateEmail(currentUser, newEmail)
        .then(() => {
            logOut()
        })
        .catch((error) => {
            console.log(error)
        })
    }
    async function verifyEmail() {
        await sendEmailVerification(currentUser)
        .then(() => {
        })
        .catch((error) => {
            console.log(error)
        })
    }
    async function resetPassword() {
        await sendPasswordResetEmail(auth, currentUser.email)
        .then(() => {
            console.log("Message sent!")
        })
        .catch((error) => {
            console.log(error)
        })
    }
    async function updateUsername(username) {
        updateProfile(currentUser, {
            displayName: username
        })
        .then(() => {
            logOut()
        })
        .catch((error) => {
            console.log(error)
        })
    }
    async function updateAvatar(url) {
        updateProfile(currentUser, {
            photoURL: url
        })
        .then(() => {
            logOut()
        })
        .catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
           })
        return unsubscribe
    }, [])
    
    const value = {
        currentUser,
        signupWithGoogle,
        logOut,
        signup,
        signIn,
        authError,
        updateUserEmail,
        verifyEmail,
        resetPassword,
        updateUsername,
        updateAvatar
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
export function useAuthentication() {
    return useContext(AuthContext)
}