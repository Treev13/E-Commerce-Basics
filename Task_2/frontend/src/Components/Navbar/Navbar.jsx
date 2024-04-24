import React from 'react'
import './Navbar.css'

import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <p>Katona Csaba - (06)70-6389896</p>
      </div>
      <ul className="nav-menu">
        <li><Link to='/index'>Home</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/stats'>Stats</Link></li>
      </ul>
    </div>
  )
}
