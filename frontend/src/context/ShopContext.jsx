import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delievery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);//this is for showing the filterProducts
  const [cartItems,setCartItems] = useState({});
  const [products,setProducts] = useState([]);
  const [token,setToken] = useState("")
  const navigate = useNavigate()


  const addToCart = async(itemId,size) => {

    if (!size) {
      toast.error('Select Product Size')
      return
    }

      let cartData = structuredClone(cartItems)

      if(cartData[itemId]){
        if(cartData[itemId][size]) {
          cartData[itemId][size] += 1 //If the item with the given size exists, increases its quantity
        } else {
          cartData[itemId][size] = 1 // If the item exists but not in this size, set it to 1
        }
      } else {
        cartData[itemId] = {} // If the item does not exist in the cart, create an empty object
        cartData[itemId][size] = 1 // Set the selected size to quantity 1
      }
   setCartItems(cartData)
    
   if(token){
    try {
      await axios.post(backendUrl + "/api/cart/add",{itemId,size},{headers:{token}})

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
   }
  }

  // For calculating the items in the cart
 const getCartCount = () => {
  let totalCount = 0;
  for(const items in cartItems) {
    for( const item in cartItems[items]){
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item]
          }
        } catch (error) {
          
        }
    }
  }
  return totalCount;
 }

 // For Deleting the items 
 const updateQuantity = async(itemId,size,quantity) => {
   let cartData = structuredClone(cartItems);

   cartData[itemId][size] = quantity;
   setCartItems(cartData)

   if(token) {
    try {
      await axios.post(backendUrl + "/api/cart/update",{itemId,size,quantity},{headers:{token}})
    } catch (error) {
      console.log("Error occur in ShopContext component",error);
      toast.error(error.message)
    }
   }
 }

 const getCartAmount = () => {
  let totalAmount = 0;
  for(const items in cartItems){
    let itemInfo = products.find((product)=>product._id === items);
    for(const item in cartItems[items]) {
      try {
        if (cartItems[items][item] > 0) {
          totalAmount += itemInfo.price * cartItems[items][item]
        }
      } catch (error) {
        
      }
    }
  }
  return totalAmount;
 }


 const getProductsData = async() => {
    try {
      const respose =  await axios.get(backendUrl + "/api/product/list")
      if(respose.data.success) {
        setProducts(respose.data.products)
      }else {
        toast.error(respose.data.message)
      }
    } catch (error) {
      console.log("Error is occur in ShopContext Component",error);
      toast.error(error.message)
    }
 }

const getUserCart = async(token ) => {
  try {
    const response = await axios.post(backendUrl + "/api/cart/get",{},{headers:{token}});
    if(response.data.success) {
      setCartItems(response.data.cartData)
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message)
  }
}

 useEffect(()=> {
  getProductsData()
 },[])

 useEffect(()=>{
 if(!token && localStorage.getItem("token")) {
    setToken(localStorage.getItem("token"))
    getUserCart(localStorage.getItem("token"))
 }
 },[])

  const value = {
   products,
    currency,
    delievery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    setCartItems,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
