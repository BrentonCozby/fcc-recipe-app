import React from 'react'
import { Link } from 'react-router-dom'

import './Card.css'

const Card = ({
    user_id,
    title,
    summary,
    image,
    recipe_id
}) => (
    <Link
        to={`/${user_id}/recipes/${recipe_id}`}
        key={recipe_id}
        className="Card">
            <h3 className="Card-title">{title}</h3>
            {image && <img src={image} alt={title} className="Card-image"/>}
            <p className="Card-summary">{summary}</p>
    </Link>
)

Card.propTypes = {
    title: React.PropTypes.string.isRequired,
    summary: React.PropTypes.string.isRequired,
    image: React.PropTypes.string,
    recipe_id: React.PropTypes.string.isRequired
}

export default Card
