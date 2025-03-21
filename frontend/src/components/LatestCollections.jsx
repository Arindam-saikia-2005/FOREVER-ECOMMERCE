
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from "../components/ProductItem.jsx"

const LatestCollections = () => {

  const { products  } = useContext(ShopContext)
   const [latestProducts,setLastestProducts] = useState([])


   useEffect(()=> {
     setLastestProducts(products.slice(0,10));
   },[products])
  return (
    <div className='my-10'>
         <div className='text-center py-8 text-3xl'>
             <Title text1={'LATEST'} text2={'COLLECTION'}/>
             <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus, enim!</p>
         </div>
             {/* Rendering Products */}
         <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-4'>
             {
                latestProducts.map((item,index)=> (
                      <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                ))
             }
         </div>
    </div>
  )
}

export default LatestCollections