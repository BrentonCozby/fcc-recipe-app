import React, {Component} from 'react'
import base from '../base'
import defaultRecipes from '../default-recipes'
import urlencode from 'urlencode'

import App from '../components/App/App.js'

class AppContainer extends Component {
    state = {
        user_id: this.props.match.url.split('/')[1] || 'demo',
        isLoggedIn: false,
        displayName: null,
        recipes: []
    }

    componentWillMount() {
        if (this.state.user_id === 'demo') return this.setState({ recipes: [...defaultRecipes] })

        const _this = this
        const user_id = this.props.match.url.split('/')[1]

        base.fetch(`users/${user_id}`, {context: _this}).then(data => {
            // if userId not found, go to demo
            if (Object.keys(data).length === 0) return false;

            _this.setState({
                user_id,
                displayName: data.displayName,
                recipes: data.recipes
            })
        })
    }

    componentWillUnmount() {
        if (this.ref) {
            base.removeBinding(this.ref)
        }
    }

    componentDidUpdate() {
        const _this = this
        if (this.state.user_id !== 'demo' && !this.ref && this.state.isLoggedIn) {
            this.ref = base.syncState(`users/${this.state.user_id}/recipes`, {
                context: _this,
                state: 'recipes',
                asArray: true
            })
        }
    }

    login = (userData, auth_id) => {
        this.setState({
            recipes: userData.recipes,
            user_id: auth_id,
            displayName: userData.displayName,
            isLoggedIn: true
        })
    }

    logout = () => {
        base.removeBinding(this.ref) || delete this.ref
        base.unauth()

        this.setState({
            recipes: defaultRecipes,
            userId: 'demo',
            displayName: null,
            isLoggedIn: false
        })
    }

    createNewRecipe = (recipe) => {
        if(this.state.recipes.some(r => r.title === 'Recipe Title')) return false

        this.setState({
            recipes: [...this.state.recipes].concat({
                title: 'Recipe Title',
                summary: 'Summary of your recipe',
                ingredients: [
                    'Ingredient 1', 'Ingredient 2', 'Ingredient 3'
                ],
                directions: [
                    'First step', 'Second step', 'Third step'
                ],
                id: Date.now()
            })
        })

        this.props.push('recipes/Recipe-Title')
    }

    deleteRecipe = (event) => {
        event.preventDefault()

        var input = event.target
        var recipes = [...this.state.recipes]
        var indexOfThisRecipe;
        for(let i = 0; i < recipes.length; i++) {
            if(+recipes[i].id === +input.dataset.recipe_id) {
                indexOfThisRecipe = i
                break;
            }
        }

        const _this = this

        if(this.state.isLoggedIn) {
            const imageRef = base.storage().ref().child(`${this.state.user_id}/images/${input.dataset.recipe_id}`)
            imageRef.delete().then(function() {
                recipes.splice(indexOfThisRecipe, 1)
                _this.setState({ recipes })
                _this.props.goBack()
            }).catch(function() {
                recipes.splice(indexOfThisRecipe, 1)
                _this.setState({ recipes })
                _this.props.goBack()
            })
        }
        else {
            recipes.splice(indexOfThisRecipe, 1)
            this.setState({ recipes })
            this.props.goBack()
        }
    }

    updateRecipe = (event) => {
        const element = event.target
        var recipes = [...this.state.recipes]
        var editedRecipe = recipes.find(r => + r.id === + element.dataset.recipe_id)

        if (element.dataset.name === 'ingredients' || element.dataset.name === 'directions') {
            editedRecipe[element.dataset.name].splice(element.dataset.index, 1, element.innerHTML)
        } else {
            editedRecipe[element.dataset.name] = element.innerHTML
        }

        this.setState({recipes})

        this.props.replace(urlencode(editedRecipe.title.replace(/\s+/g, '-')))
    }

    uploadImage = (event, droppedFile) => {
        const _this = this
        const input = event.target
        var recipes = [...this.state.recipes]
        var thisRecipe = recipes.find(r => +r.id === +input.dataset.recipe_id)
        const file = (droppedFile) ? droppedFile : event.target.files[0]

        console.log(input);

        // Create a reference to 'user_id/images/sugar-cookies.jpg'
        const imageRef = base.storage().ref().child(`${this.state.user_id}/images/${input.dataset.recipe_id}`)

        const metadata = {
            contentType: file.type
        }

        // Upload image file
        // Note: if file already exists for filepath, it will be replaced
        imageRef.put(file, metadata)
        .then(() => imageRef.getMetadata())
        .then(data => {
            // set url for image key in recipes
            thisRecipe.image = data.downloadURLs[0]
            _this.setState({ recipes })
        })
    }

    render() {
        return (
            <App
                {...this.state}
                login={this.login}
                logout={this.logout}
                createNewRecipe={this.createNewRecipe}
                deleteRecipe={this.deleteRecipe}
                updateRecipe={this.updateRecipe}
                uploadImage={this.uploadImage}
            />
        )
    }
}

export default AppContainer
