import React, {Component} from 'react'

import './Recipe.css'

class Recipe extends Component {

    static propTypes = {
        title: React.PropTypes.string.isRequired,
        summary: React.PropTypes.string.isRequired,
        image: React.PropTypes.string,
        ingredients: React.PropTypes.array,
        directions: React.PropTypes.array,
        recipe_id: React.PropTypes.number.isRequired,
        isLoggedIn: React.PropTypes.bool.isRequired
    }

    updateRecipe = (event) => {
        this.props.updateRecipe(event)
    }

    onDrag = (e) => {
        e.stopPropagation()
        e.preventDefault()
    }

    onDrop = (event) => {
        event.stopPropagation()
        event.preventDefault()

        var dt = event.dataTransfer;
        var file = dt.files[0];

        this.props.uploadImage(event, file)
    }

    render() {
        return (
            <div className="Recipe">
                <div className="title-image-summary">
                    <h2
                        className="Recipe-title Recipe-input"
                        contentEditable={this.props.isLoggedIn}
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
                        : <div>
                            <label
                                className="image-dropbox"
                                htmlFor="image-upload"
                                data-recipe_id={this.props.recipe_id}
                                onDragEnter={this.onDrag}
                                onDragLeave={this.onDrag}
                                onDragEnd={this.onDrag}
                                onDragOver={this.onDrag}
                                onDrop={this.onDrop}>
                                Upload Image
                            </label>
                            <input
                                className="image-upload"
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                data-recipe_id={this.props.recipe_id}
                                data-name="title"
                                style={{display: 'none'}}
                                onChange={this.props.uploadImage}
                            />
                        </div>
                    }
                    <p
                        className="Recipe-summary Recipe-input"
                        contentEditable={this.props.isLoggedIn}
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
                                contentEditable={this.props.isLoggedIn}
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
                                contentEditable={this.props.isLoggedIn}
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

export default Recipe
