import React from 'react'
import  {Routes, Route, useLocation, Navigate} from 'react-router-dom'
import LandingPage from "../pages/landingPage/landingPage";
import OrderPage from '../pages/orderPage/OrderPage'; 
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import PrivateRoute from '../context/auth/PrivateRoute';
import AccountDetails from '../pages/AccountDetails/AccountDetails';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import Burgers from '../pages/Categories/Burgers/Burgers';
import Salads from '../pages/Categories/Salads/Salads';
import Desserts from '../pages/Categories/Desserts/Desserts';
import ShoppingCartPage from '../pages/ShoppingCartPage/ShoppingCartPage';
import OrderHistory from '../pages/OrderHistory/OrderHistory';
import OrderDetails from '../pages/OrderDetails/OrderDetails';
import SurveyPage from '../pages/SurveyPage/SurveyPage';
import Receipt from '../pages/Receipt/Receipt';
import LoginPage from "../pages/loginPage/loginPage";
import {AnimatePresence} from 'framer-motion';
import { useAuthentication } from '../context/auth/AuthContext';
const AnimatedRoutes = () => {
const location = useLocation();
const {currentUser} = useAuthentication()
  return (
        <AnimatePresence>
        <Routes location={location} key={location.pathname}>
        <Route path="/login">
            <Route index element={currentUser ? <Navigate to="/"/> : <LoginPage/>}/>
        </Route>
        <Route path="/">
        <Route index element={<LandingPage/>}/>
        </Route>
        <Route path="/order" element={
            <PrivateRoute><OrderPage/></PrivateRoute>
        }/>
        <Route path="/burgers" element={<Burgers/>} exact>
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
        <Route index element={<PrivateRoute><OrderHistory/></PrivateRoute>}/>
        </Route>
        <Route path='/order-history/:id'>
            <Route index element={<PrivateRoute><OrderDetails pending={false}/></PrivateRoute>}/>
        </Route>
        <Route path='/orders/:id'>
            <Route index element={<PrivateRoute><OrderDetails pending={true}/></PrivateRoute>}/>
        </Route>
        <Route path='/success/:id'>
            <Route index element={<PrivateRoute><SurveyPage result={'success'}/></PrivateRoute>}/>
        </Route>
        <Route path='/fail/:id'>
            <Route index element={<PrivateRoute><SurveyPage result={'fail'}/></PrivateRoute>}/>
        </Route>
        <Route path='/receipt/:id'>
            <Route index element={<PrivateRoute><Receipt/></PrivateRoute>}/>
        </Route>
        <Route path="*">
        <Route index element={<NotFoundPage/>}/>
        </Route>
        </Routes>
        </AnimatePresence>
  )
}

export default AnimatedRoutes