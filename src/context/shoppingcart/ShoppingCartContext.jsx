import { createContext } from "react";
import { useContext } from "react";
import useLocalStorage from '../../hooks/useLocalStorage';
const ShoppingCartContext = createContext({})
export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}
export function ShoppingCartProvider({children}) {
    const [shoppingCartItems,setShoppingCartItems] = useLocalStorage("shoppingcart",[]);
    const addItem = (item) => {
        const itemId = shoppingCartItems.length > 0 ? Math.max(...shoppingCartItems.map((item) => item.id)) + 1 : 0;
        const newItem = 
        {
            id: itemId,
            item
        };
        setShoppingCartItems([...shoppingCartItems,newItem]);
    }
    const getShoppingCartLength = () => {
        return shoppingCartItems.length
    }
    const removeItem = (id) => {
        const updatedShoppingCart = shoppingCartItems.filter((item) => item.id !== id)
        setShoppingCartItems(updatedShoppingCart)
    } 
    const resetShoppingCart = () => {
        setShoppingCartItems([])
        return shoppingCartItems;
    }
    const shoppingCartValue = {
        shoppingCartItems,
        addItem,
        getShoppingCartLength,
        removeItem,
        resetShoppingCart
    }
    return ( 
    <ShoppingCartContext.Provider value={shoppingCartValue}>
        {children}
    </ShoppingCartContext.Provider>
    )
}