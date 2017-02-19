import React from 'react'

import './MenuButton.css'

const MenuButton = ({ isMenuOpen, toggleMenu }) => (
    <div onClick={toggleMenu} className={(isMenuOpen) ? "Menu-button open" : "Menu-button"}>
        <span className="menu-button-line top"></span>
        <span className="menu-button-line middle"></span>
        <span className="menu-button-line bottom"></span>
    </div>
)

MenuButton.propTypes = {
    isMenuOpen: React.PropTypes.bool.isRequired,
    toggleMenu: React.PropTypes.func.isRequired
}

export default MenuButton
