import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";

//create context
export const storeContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token,setToken]=useState("")
  const url="http://localhost:3000";
  const [food_list,setFoodlist]=useState([]);
  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let iteminfo = food_list.find((product) => product._id === item);
        totalAmount += iteminfo.price * cartItems[item];
      }
    }
    console.log(totalAmount)
    return totalAmount;
  };
  //fetch items from api

  const fetchItems=async ()=>{
    const items=await axios.get(url+"/api/food/list");
    console.log(items)
    setFoodlist(items.data.message)
    console.log(items)
  }
  useEffect(()=>{

    async function fetchdata(){
      await fetchItems();
      if(localStorage.getItem("token:")){
        setToken(localStorage.getItem("token:"));
      }
    }
    fetchdata()
    
  },[])

  const storeContextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,getTotalAmount,
    url,token,setToken
  };


  return (
    <storeContext.Provider value={storeContextValue}>
      {children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;
