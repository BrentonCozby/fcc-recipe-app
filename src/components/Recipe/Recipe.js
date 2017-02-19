import React, {Component} from 'react'

import './Recipe.css'

class Recipe extends Component {

    updateRecipe = (event) => {
        this.props.updateRecipe(event)
    }

    render() {
        return (
            <div className="Recipe">
                <div className="title-image-summary">
                    <h2
                        className="Recipe-title Recipe-input"
                        contentEditable="true"
                        data-recipe_id={this.props.recipe_id}
                        data-name="title"
                        onBlur={this.updateRecipe}>
                        {this.props.title}
                    </h2>
                    {(this.props.image)
                        ? <img
                            className="Recipe-image"
                            src={this.props.image}
                            alt={this.props.title}/>
                        : null
                    }
                    <p
                        className="Recipe-summary Recipe-input"
                        contentEditable="true"
                        data-recipe_id={this.props.recipe_id}
                        data-name="summary"
                        onBlur={this.updateRecipe}>
                        {this.props.summary}
                    </p>
                </div>
                <div className="ingredients-container">
                    <h4 className="Recipe-subtitle">Ingredients</h4>
                    <ul className="Recipe-ingredients">
                        {this.props.ingredients && this.props.ingredients.map((item, i) => (
                            <li
                                key={i}
                                contentEditable="true"
                                data-recipe_id={this.props.recipe_id}
                                data-index={i}
                                data-name="ingredients"
                                onBlur={this.updateRecipe}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="directions-container">
                    <h4 className="Recipe-subtitle">Directions</h4>
                    <ol className="Recipe-directions">
                        {this.props.directions && this.props.directions.map((step, i) => (
                            <li
                                key={i}
                                contentEditable="true"
                                data-recipe_id={this.props.recipe_id}
                                data-index={i}
                                data-name="directions"
                                onBlur={this.updateRecipe}>
                                {step}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

Recipe.propTypes = {
    title: React.PropTypes.string.isRequired,
    summary: React.PropTypes.string.isRequired,
    image: React.PropTypes.string,
    ingredients: React.PropTypes.array,
    directions: React.PropTypes.array,
    recipe_id: React.PropTypes.string.isRequired
}

export default Recipe
