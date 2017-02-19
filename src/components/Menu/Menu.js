import React from 'react'
import { Link } from 'react-router-dom'

import './Menu.css'

const Menu = ({ toggleMenu }) => (
    <div className="Menu">
        <h3 className="menu-title">Menu</h3>
        <span onClick={toggleMenu} className="menu-item">Item 1</span>
        <span onClick={toggleMenu} className="menu-item">Item 2</span>
        <span onClick={toggleMenu} className="menu-item">Item 3</span>
        <Link className="login-logout-btn" onClick={toggleMenu} to="/login">Login</Link>
    </div>
)

Menu.propTypes = {
    toggleMenu: React.PropTypes.func.isRequired
}

export default Menu
