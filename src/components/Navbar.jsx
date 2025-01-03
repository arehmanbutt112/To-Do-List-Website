import React from 'react'

const Navbar = () => {
  return (
    <nav  className='flex justify-around bg-indigo-900 text-white py-2'>
        <div>
            <span className='font-bold text-xl'>iTask</span>
        </div>
        <ul className="flex gap-5">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar