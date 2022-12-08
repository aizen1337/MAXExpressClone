import { BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from "./pages/landingPage/landingPage";
import LoginPage from "./pages/loginPage/loginPage";
import OrderPage from './pages/orderPage/OrderPage'; 
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import PrivateRoute from './context/auth/PrivateRoute';
import AccountDetails from './pages/AccountDetails/AccountDetails';
import { AuthProvider } from './context/auth/AuthContext';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Burgers from './pages/Categories/Burgers/Burgers';
import Salads from './pages/Categories/Salads/Salads';
import Desserts from './pages/Categories/Desserts/Desserts';
import ShoppingCartPage from './pages/ShoppingCartPage/ShoppingCartPage';
import { ShoppingCartProvider } from './context/shoppingcart/ShoppingCartContext';
import OrderHistory from './pages/OrderHistory/OrderHistory';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ShoppingCartProvider>
        <Routes>
          <Route path="/">
            <Route index element={<LandingPage/>}/>
          </Route>
            <Route path="/login">
            <Route index element={<LoginPage/>}/>
            </Route>
            <Route path="/order" element={
              <PrivateRoute><OrderPage/></PrivateRoute>
            }/>
            <Route path="/burgers"  element={<Burgers/>} exact>
            </Route>
            <Route path="/burgers/:id" element={<ProductDetails/>} exact></Route>
            <Route path="/salads"  element={<Salads/>} exact>
            </Route>
            <Route path="/salads/:id" element={<ProductDetails/>} exact></Route>
            <Route path="/desserts" element={<Desserts/>} exact>
            </Route>
            <Route path="/desserts/:id" element={<ProductDetails/>} exact></Route>
            <Route path="/account-settings" element={
            <PrivateRoute><AccountDetails/></PrivateRoute>
            }/>
            <Route path="/shopping-cart">
            <Route index element={<PrivateRoute><ShoppingCartPage/></PrivateRoute>}/>
            </Route>
            <Route path="/order-history">
            <Route index element={<OrderHistory/>}/>
            </Route>
           <Route path="*">
            <Route index element={<NotFoundPage/>}/>
          </Route>
          </Routes>
          </ShoppingCartProvider>    
    </AuthProvider>
  </BrowserRouter>
  );
}

export default App;
