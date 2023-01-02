import { AuthProvider } from './context/auth/AuthContext';
import { ShoppingCartProvider } from './context/shoppingcart/ShoppingCartContext';
import { BrowserRouter } from 'react-router-dom';
import AnimatedRoutes from './routes/AnimatedRoutes';
import "./assets/globals.scss";
import Sidebar from './components/Sidebar/Sidebar';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Sidebar/>
        <ShoppingCartProvider>
          <AnimatedRoutes/>
        </ShoppingCartProvider>    
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
