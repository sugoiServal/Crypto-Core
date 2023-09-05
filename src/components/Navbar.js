import React from 'react'
import {FaCoins} from'react-icons/fa'
import './Navbar.css'
import { Link } from 'react-router-dom'


export default function Navbar() {
  return (
    <Link to={'/'}>
      <div className='navbar'>
          <FaCoins className='icon mr-2' size={60} />
          <h1 className='text-4xl'>Crypto <span className='text-primary'>Core</span></h1>
      </div>
    </Link>
  )
}
