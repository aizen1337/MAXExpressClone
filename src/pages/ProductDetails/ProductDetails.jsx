import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuthentication } from "../../context/auth/AuthContext";
import { getDoc } from "firebase/firestore";
const ProductDetails = () => {
    const {currentUser} = useAuthentication()
    const {id} = useParams()
    const document = getDoc(id)
    return (
        <div className="productDetails">
            <Sidebar userData={currentUser}/>
            <div className="content">
                {document.name}
            </div>
        </div>
    );
}
 
export default ProductDetails;