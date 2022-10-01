import { Navigate } from "react-router-dom";
import { useAuthentication } from "../auth/AuthContext";
export default function PrivateRoute( {children} ) {
        const { currentUser } = useAuthentication();
        return currentUser ? children : <Navigate to="/"/>
}
