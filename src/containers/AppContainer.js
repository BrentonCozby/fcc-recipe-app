import React, {Component} from 'react'
import base from '../base'
import defaultRecipes from '../default-recipes'
import urlencode from 'urlencode'

import App from '../components/App/App.js'

class AppContainer extends Component {
    state = {
        user_id: 'demo',
        isLoggedIn: false,
        displayName: null,
        recipes: []
    }

    componentWillMount() {
        if (this.state.user_id === 'demo') return this.setState({ recipes: [...defaultRecipes] })
    }

    componentDidMount() {
        const AppContainer = this
        const user_id = this.props.match.url.split('/')[1]

        base.fetch(`users/${user_id}`, {context: AppContainer}).then(data => {
            // if userId not found, go to demo
            if (Object.keys(data).length === 0) return false;

            AppContainer.setState({ user_id, recipes: data.recipes })
        })
    }

    componentWillUnmount() {
        if (this.ref) {
            base.removeBinding(this.ref)
        }
    }

    componentDidUpdate() {
        if (this.state.user_id !== 'demo' && !this.ref) {
            this.ref = base.syncState(`users/${this.state.user_id}/recipes`, {
                context: this,
                state: 'recipes',
                asArray: true
            })
        }
    }

    login = (userData, auth_id) => {
        this.setState({recipes: userData.recipes, user_id: auth_id, displayName: userData.displayName, isLoggedIn: true})
    }

    logout = () => {
        base.removeBinding(this.ref) || delete this.ref
        base.unauth()

        this.setState({recipes: defaultRecipes, userId: 'demo', displayName: null, isLoggedIn: false})
    }

    createNewRecipe = (recipe) => {
        this.setState({
            recipes: [...this.state.recipes].concat({
                title: 'Recipe Title',
                summary: 'Summary of your recipe',
                image: null,
                ingredients: [
                    'Ingredient 1', 'Ingredient 2', 'Ingredient 3'
                ],
                directions: [
                    'First step', 'Second step', 'Third step'
                ],
                id: Date.now()
            })
        })
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

        this.props.push(urlencode(editedRecipe.title.replace(/\s+/g, '-')))
    }

    uploadImage = (event, droppedFile) => {
        const input = event.target
        const file = (droppedFile)
            ? droppedFile
            : event.target.files[0]
        // Create a root reference
        var storageRef = base.storage().ref();

        // Create a reference to 'user_id/images/sugar-cookies.jpg'
        var userImagesRef = storageRef.child(`${this.state.user_id}/images/${input.dataset.recipe_id}/${file.name}`);

        const metadata = {
            contentType: file.type
        }

        userImagesRef.put(file, metadata).then(snapshot => {
            console.log('snapshot: ', snapshot);
        })
    }

    render() {
        return <App {...this.state} login={this.login} logout={this.logout} createNewRecipe={this.createNewRecipe} updateRecipe={this.updateRecipe} uploadImage={this.uploadImage}/>
    }
}

export default AppContainer
