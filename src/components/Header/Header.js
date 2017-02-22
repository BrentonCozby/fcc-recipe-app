import React from 'react'

import './Header.css'

const Header = ({
    displayName,
    createNewRecipe,
    isEditable
}) => (
    <div className="Header">
        {isEditable && (
            <span className="add-recipe-btn" onClick={createNewRecipe}>+</span>
        )}
        <h1 className="Header-title">
            {(displayName)
                ? `${displayName}'s Recipes`
                : 'Recipe App'
            }
        </h1>
    </div>
)

Header.propTypes = {
    displayName: React.PropTypes.string
}

export default Header
