import React from 'react'
import { Link } from 'react-router-dom'
import urlencode from 'urlencode'

import './Card.css'

const Card = ({
    user_id,
    title,
    summary,
    image,
    recipe_id
}) => (
    <Link
        to={`/${user_id}/recipes/${urlencode(title.replace(/\s+/g, '-'))}`}
        key={recipe_id}
        className="Card">
            {image && <img src={image} alt={title} className="Card-image"/>}
            <h3 className="Card-title">{title}</h3>
            <p className="Card-summary">{summary}</p>
    </Link>
)

Card.propTypes = {
    title: React.PropTypes.string.isRequired,
    summary: React.PropTypes.string.isRequired,
    image: React.PropTypes.string,
    recipe_id: React.PropTypes.number.isRequired
}

export default Card
