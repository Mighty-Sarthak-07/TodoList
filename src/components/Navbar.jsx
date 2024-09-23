import React from 'react'
const Navbar = () => {
  return (
    <div>
      <div className="nav justify-between flex bg-slate-900 text-white p-4 font-bold">
        <div className="logo">
            <span className = "font-bold text-xl">DTasker</span>
        </div>
        <ul className="flex gap-6">
            <li  className = "cursor-pointer hover:text-blue-400 hover:font-extrabold transition-all ease-in-out duration-300">Home</li>
            <li className = "cursor-pointer hover:text-blue-400 hover:font-extrabold transition-all ease-in-out duration-300">About</li>
            <li className = "cursor-pointer hover:text-blue-400 hover:font-extrabold transition-all ease-in-out duration-300">Contact</li>
            <li className = "cursor-pointer hover:text-blue-400 hover:font-extrabold transition-all ease-in-out duration-300">Your Tasks</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
