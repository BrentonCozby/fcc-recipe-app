import React from 'react'

import './ImageUploadBtn.css'

function onDrag(event) {
    event.stopPropagation()
    event.preventDefault()
}

function onDrop(event, uploadImageFunc) {
    event.stopPropagation()
    event.preventDefault()

    var dt = event.dataTransfer;
    var file = dt.files[0];

    uploadImageFunc(event, file)
}

const ImageUploadBtn = ({
    imageExists,
    recipe_id,
    uploadImage
}) => (
    <div>
        {!imageExists && (
            <div className="upload-image-text">
                <div>
                    <p>Upload Image</p>
                    <p>Drag and Drop</p>
                    <p>or Click here!</p>
                </div>
            </div>
        )}
        <label
            className={(imageExists)
                 ? "edit-image-btn"
                 : "image-dropbox"}
            htmlFor="image-upload"
            data-recipe_id={recipe_id}
            onDragEnter={onDrag}
            onDragLeave={onDrag}
            onDragEnd={onDrag}
            onDragOver={onDrag}
            onDrop={(e) => onDrop(e, uploadImage)}>
            {imageExists && "Edit Image"}
        </label>
        <input
            className="image-upload"
            id="image-upload"
            type="file"
            accept="image/*"
            data-recipe_id={recipe_id}
            style={{display: 'none'}}
            onChange={uploadImage}
        />
    </div>
)

ImageUploadBtn.propTypes = {
    imageExists: React.PropTypes.string,
    recipe_id: React.PropTypes.number,
    uploadImage: React.PropTypes.func
}

export default ImageUploadBtn
