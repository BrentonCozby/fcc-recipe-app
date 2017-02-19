import React from 'react'

import Recipe from '../../components/Recipe/Recipe'

import './RecipePage.css'

const RecipePage = ({
    recipe,
    updateRecipe
}) => (
    <div className="RecipePage">
        <Recipe
            title={recipe.title}
            summary={recipe.summary}
            image={recipe.image}
            ingredients={recipe.ingredients}
            directions={recipe.directions}
            updateRecipe={updateRecipe}
            recipe_id={recipe.id}
            key={recipe.id}
        />
    </div>
)

RecipePage.propTypes = {
    recipe: React.PropTypes.object.isRequired
}

export default RecipePage
