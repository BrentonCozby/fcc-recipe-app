import React from 'react'

import Recipe from '../../components/Recipe/Recipe'

import './RecipePage.css'

const RecipePage = ({
    recipe,
    deleteRecipe,
    updateRecipe,
    uploadImage,
    isEditable
}) => (
    <div className="RecipePage">
        <Recipe
            title={recipe && recipe.title}
            summary={recipe && recipe.summary}
            image={recipe && recipe.image}
            ingredients={recipe && recipe.ingredients}
            directions={recipe && recipe.directions}
            deleteRecipe={deleteRecipe}
            updateRecipe={updateRecipe}
            uploadImage={uploadImage}
            recipe_id={recipe && +recipe.id}
            key={recipe && recipe.id}
            isEditable={isEditable}
        />
    </div>
)

RecipePage.propTypes = {
    recipe: React.PropTypes.object,
    updateRecipe: React.PropTypes.func.isRequired,
    uploadImage: React.PropTypes.func.isRequired,
    isEditable: React.PropTypes.bool.isRequired
}

export default RecipePage
