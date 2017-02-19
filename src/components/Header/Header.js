import React from 'react'

import './Header.css'

const Header = ({
    displayName,
    createNewRecipe
}) => (
    <div className="Header">
        <span className="add-recipe-btn" onClick={createNewRecipe}>+</span>
        <h1 className="Header-title">
            {(displayName)
                ? `${displayName}'s Recipes`
                : 'Recipe App'
            }
        </h1>
    </div>
)

Header.propTypes = {
    title: React.PropTypes.string.isRequired,
    createNewRecipe: React.PropTypes.func.isRequired
}

export default Header
