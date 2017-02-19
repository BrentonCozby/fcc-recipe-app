import React from 'react'

import Card from '../../components/Card/Card.js'

import './Collage.css'

const Collage = ({
    user_id,
    recipes
}) => (
    <div className="Collage">
        {recipes && recipes.map(recipe => (
            <Card
                user_id={user_id}
                title={recipe.title}
                summary={recipe.summary}
                image={recipe.image || null}
                recipe_id={+recipe.id}
                key={recipe.id}
            />
        ))}
    </div>
)

export default Collage
