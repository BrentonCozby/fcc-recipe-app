import React from 'react'

import Recipe from '../../components/Recipe/Recipe'

import './RecipePage.css'

const RecipePage = ({
    recipe,
    updateRecipe,
    uploadImage,
    isLoggedIn
}) => (
    <div className="RecipePage">
        <Recipe
            title={recipe.title}
            summary={recipe.summary}
            image={recipe.image}
            ingredients={recipe.ingredients}
            directions={recipe.directions}
            updateRecipe={updateRecipe}
            uploadImage={uploadImage}
            recipe_id={+recipe.id}
            key={recipe.id}
            isLoggedIn={isLoggedIn}
        />
    </div>
)

RecipePage.propTypes = {
    recipe: React.PropTypes.object.isRequired
}

export default RecipePage
