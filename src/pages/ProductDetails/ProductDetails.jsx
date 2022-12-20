import { doc, getDoc,} from "firebase/firestore";
import { useEffect, useState } from "react";
import {useLocation, useParams} from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { db } from "../../firebase/firebase";
import "./productdetails.scss";
import Arrow from "../../components/ui/Arrow/Arrow";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import { useShoppingCart } from "../../context/shoppingcart/ShoppingCartContext";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const ProductDetails = () => {
    const {addItem} = useShoppingCart();
    const [data,setData] = useState()
    const collection = useLocation().pathname.split("/")[1]
    const {id} = useParams()
    const [alertOpen,setAlertOpen] = useState(false)
    async function singleDocument() {
        const docRef = doc(db, collection, id);
        const docSnap = await getDoc(docRef);
        setData(docSnap.data())
    }
    const history = useNavigate();
    const addingToShoppingCartHandler = (item,path) => {
        setAlertOpen(true)
        setTimeout(()=>{
            addItem(item,path)
            history(-1);
        }
        ,1000)
    }
    useEffect(()=>{
        singleDocument()
        },[])
    return (
        <>
    {data && alertOpen && 
            <Snackbar open={alertOpen} autoHideDuration={1500} onClose={()=> setAlertOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert severity="success" sx={{ width: '100%' }}>
                <h4>Pomyślnie dodano {data.name} do zamówienia</h4>
            </Alert>
            </Snackbar>
      }
        <div className="productDetails">
            <Sidebar/>
            <Arrow/>
            <ShoppingCart/>
            <div className="content">
                {data &&
                <>
                <div className="left">
                    <img className="productImage" src={data.photoURL} alt={data.name}/>
                    <h1 className="productTitle">{data.name}</h1>
                </div>
                <div className="right">
                    <p className="productDescription">{data?.description || "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"}</p>
                    <div className="addToCart">
                        <h3 className="addToCartTitle" onClick={() => addingToShoppingCartHandler(data,`/${collection}/${id}`)}>Dodaj do koszyka <AiOutlineShoppingCart/></h3>
                        <h3 className="productPrice">{data.price},00 zł</h3>
                    </div>
                </div>
                </>
                }
            </div>
        </div>
        </>
    );
}
 
export default ProductDetails;