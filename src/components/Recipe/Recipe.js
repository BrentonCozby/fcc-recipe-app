import React, {Component} from 'react'

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

    renderImage = () => {
        const imageUploadBtn = (
            <div>
                {!this.props.image && (
                    <div className="upload-image-text">
                        <div>
                            <p>Upload Image</p>
                            <p>Drag and Drop</p>
                            <p>or Click here!</p>
                        </div>
                    </div>
                )}
                <label
                    className={(this.props.image)
                         ? "edit-image-btn"
                         : "image-dropbox"}
                    htmlFor="image-upload"
                    data-recipe_id={this.props.recipe_id}
                    onDragEnter={this.onDrag}
                    onDragLeave={this.onDrag}
                    onDragEnd={this.onDrag}
                    onDragOver={this.onDrag}
                    onDrop={this.onDrop}>
                    {this.props.image && "Edit Image"}
                </label>
                <input
                    className="image-upload"
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    data-recipe_id={this.props.recipe_id}
                    style={{display: 'none'}}
                    onChange={this.props.uploadImage}
                />
            </div>
        )

        if(this.props.image) {
            return (
                <div>
                    {this.props.isEditable && imageUploadBtn}
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
                    {imageUploadBtn}
                </div>
            )
        }

        return false
    }

    render() {
        return (
            <div className="Recipe">
                <div className="title-image-summary">
                    <button
                        className="delete-recipe-btn"
                        data-recipe_id={this.props.recipe_id}
                        onClick={this.props.deleteRecipe}>
                        Delete Recipe
                    </button>
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
                            <li
                                key={i}
                                contentEditable={this.props.isEditable}
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
                                contentEditable={this.props.isEditable}
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
