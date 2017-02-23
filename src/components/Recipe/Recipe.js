import React, {Component} from 'react'

import ImageUploadBtn from './ImageUploadBtn/ImageUploadBtn.js'

import './Recipe.css'

class Recipe extends Component {

    static propTypes = {
        title: React.PropTypes.string,
        summary: React.PropTypes.string,
        image: React.PropTypes.string,
        ingredients: React.PropTypes.array,
        directions: React.PropTypes.array,
        recipe_id: React.PropTypes.number,
        isEditable: React.PropTypes.bool.isRequired
    }

    componentDidMount() {
        this.title.focus()
    }

    updateRecipe = (event) => {
        this.props.updateRecipe(event)
    }

    renderImage = () => {
        if(this.props.image) {
            return (
                <div>
                    {this.props.isEditable && (
                        <ImageUploadBtn
                            imageExists={this.props.image}
                            recipe_id={this.props.recipe_id}
                            uploadImage={this.props.uploadImage}
                        />
                    )}
                    <img
                        className="Recipe-image"
                        src={this.props.image}
                        alt={this.props.title}/>
                </div>
            )
        }

        if(this.props.isEditable) {
            return (
                <div>
                    <ImageUploadBtn
                        imageExists={this.props.image}
                        recipe_id={this.props.recipe_id}
                        uploadImage={this.props.uploadImage}
                    />
                </div>
            )
        }

        return false
    }

    render() {
        return (
            <div className="Recipe">
                <button
                    className="delete-recipe-btn"
                    data-recipe_id={this.props.recipe_id}
                    onClick={this.props.deleteRecipe}>
                    Delete Recipe
                </button>
                <div className="title-image-summary">
                    <h2
                        className="Recipe-title Recipe-input"
                        contentEditable={this.props.isEditable}
                        data-recipe_id={this.props.recipe_id}
                        data-name="title"
                        onBlur={this.updateRecipe}
                        ref={(el) => this.title = el}>
                        {this.props.title}
                    </h2>
                    {this.renderImage()}
                    <p
                        className="Recipe-summary Recipe-input"
                        contentEditable={this.props.isEditable}
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
                            <li key={i}>
                                <p
                                    className="Recipe-ingredient"
                                    contentEditable={this.props.isEditable}
                                    data-recipe_id={this.props.recipe_id}
                                    data-index={i}
                                    data-name="ingredients"
                                    onBlur={this.updateRecipe}>
                                    {item}
                                </p>
                                <span
                                    className="delete-li-btn"
                                    data-recipe_id={this.props.recipe_id}
                                    data-index={i}
                                    onClick={this.props.deleteIngredient}>
                                    ×
                                </span>
                            </li>
                        ))}
                        <li
                            className="add-li-btn"
                            data-recipe_id={this.props.recipe_id}
                            onClick={this.props.addIngredient}>
                            Add Ingredient
                        </li>
                    </ul>
                </div>
                <div className="directions-container">
                    <h4 className="Recipe-subtitle">Directions</h4>
                    <ol className="Recipe-directions">
                        {this.props.directions && this.props.directions.map((step, i) => (
                            <li key={i}>
                                <span
                                    contentEditable={false}
                                    className="delete-li-btn"
                                    data-recipe_id={this.props.recipe_id}
                                    data-index={i}
                                    onClick={this.props.deleteDirection}>
                                    ×
                                </span>
                                <p
                                    className="Recipe-direction"
                                    contentEditable={this.props.isEditable}
                                    data-recipe_id={this.props.recipe_id}
                                    data-index={i}
                                    data-name="directions"
                                    onBlur={this.updateRecipe}>
                                    {step}
                                </p>
                            </li>
                        ))}
                        <li
                            className="add-li-btn"
                            data-recipe_id={this.props.recipe_id}
                            onClick={this.props.addDirection}>
                            Add Direction
                        </li>
                    </ol>
                </div>
            </div>
        )
    }
}

export default Recipe
