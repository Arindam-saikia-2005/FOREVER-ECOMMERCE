import React from 'react'

const NewsLetter = () => {

  const onSubmitHandler = (e) => {
       e.preventDefault()
  }

  return (
    <div className='text-center'>
       <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
       <p className='text-gray-400 mt-3'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, odit.
       </p>
       <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border rounded-md pl-3'>
        <input className='w-full sm:flex-1 outline-none ' type='email' placeholder='Enter your Email'  required/>
        <button className='bg-black text-white text-xs rounded-md px-1 py-4 ' type='submit'>SUBSCRIBE</button>
       </form>
    </div>
  )
}

export default NewsLetter