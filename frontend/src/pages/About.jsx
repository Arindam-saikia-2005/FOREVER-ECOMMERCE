
import React from 'react';
import Title from "../components/Title.jsx";
import { assets } from "../assets/assets.js";
import NewsLetter from "../components/NewsLetter.jsx";


const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      
      <div className='my-10 flex flex-col md:flex-row gap-16'>
         <img className='w-full md:max-w-[450px]' src={assets.about_img} />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, deserunt nisi, quos, autem voluptatem reprehenderit vero cum ea dolor quidem accusantium rem consequatur error voluptatum.</p>
             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est explicabo similique eligendi laborum beatae officiis, vero perferendis minus quo corporis.</p>
             <b className='text-gray-800' >Our Mission</b>
             <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio impedit nobis suscipit corrupti sunt ad maiores, atque distinctio deleniti? Libero!</p>
          </div>
      </div>

      <div className='text-xl py-4'>
           <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
            
            <div className=' px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Quality Assurance:</b>
                <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non itaque iste illo illum maxime numquam?</p>
            </div>
            <div className=' px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Convience:</b>
                <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non itaque iste illo illum maxime numquam?</p>
            </div>
            <div className=' px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Exceptional Customer Service:</b>
                <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non itaque iste illo illum maxime numquam?</p>
            </div>
      </div>

      <NewsLetter/>

    </div>
  )
}

export default About