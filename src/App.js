import { BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from "./pages/landingPage/landingPage";
import LoginPage from "./pages/loginPage/loginPage";
import OrderPage from './pages/orderPage/OrderPage'; 
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import PrivateRoute from './context/auth/PrivateRoute';
import AccountDetails from './pages/AccountDetails/AccountDetails';
import { AuthProvider } from './context/auth/AuthContext';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Burgers from './pages/orderPage/Burgers/Burgers';
import Salads from './pages/orderPage/Salads/Salads';
import Desserts from './pages/orderPage/Desserts/Desserts';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>    
        <Routes>
          <Route path="/">
            <Route index element={<LandingPage/>}/>
          </Route>
          <Route path="/login">
            <Route index element={<LoginPage/>}/>
          </Route>
          <Route path="/order" element={
            <PrivateRoute><OrderPage/></PrivateRoute>
          }>
            <Route path="burgers" element={<Burgers/>}>
              <Route path=":id" element={<ProductDetails/>}/>
            </Route>
            <Route path="salads" element={<Salads/>}/>
              <Route path=":id" element={<ProductDetails/>}>
            </Route>
            <Route path="desserts" element={<Desserts/>}>
              <Route path=":id" element={<ProductDetails/>}/>
            </Route>
          </Route>
          <Route path="/account-settings" index element={
            <PrivateRoute><AccountDetails/></PrivateRoute>
          }/>
           <Route path="*">
            <Route index element={<NotFoundPage/>}/>
          </Route>
          </Routes>
    </AuthProvider>
  </BrowserRouter>
  );
}

export default App;
