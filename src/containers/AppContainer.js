import React, { Component } from 'react'
import base from '../base'
import defaultRecipes from '../default-recipes'

import App from '../components/App/App.js'

class AppContainer extends Component {
    state = {
        user_id: 'demo',
        displayName: null,
        recipes: []
    }

    componentWillMount() {
       if(this.state.user_id === 'demo') {
           return this.setState({ recipes: [...defaultRecipes] })
       }
   }

   componentWillUnmount() {
       if(this.ref) {
           base.removeBinding(this.ref)
       }
   }

   componentDidUpdate() {
       if(this.state.user_id !== 'demo' && !this.ref) {
           this.ref = base.syncState(`users/${this.state.user_id}/recipes`, {
               context: this,
               state: 'recipes',
               asArray: true
           })
       }
   }

   login = (userData, auth_id) => {
       this.setState({
           recipes: userData.recipes,
           user_id: auth_id,
           displayName: userData.displayName
       })
   }

   logout = () => {
       base.removeBinding(this.ref) || delete this.ref
       base.unauth()

       this.setState({
           recipes: defaultRecipes,
           userId: 'demo',
           displayName: null
       })
   }

   createNewRecipe = (recipe) => {
       this.setState({
           recipes: [...this.state.recipes].concat({
               title: 'Recipe Title',
               summary: 'Summary of your recipe',
               image: null,
               ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
               directions: ['First step', 'Second step', 'Third step'],
               id: 'new-recipe'
           })
       })
   }

   updateRecipe = (event) => {
        const element = event.target
        var recipes = [...this.state.recipes]
        var editedRecipe = recipes.find(r => r.id === element.dataset.recipe_id)

        if(element.dataset.name === 'ingredients' || element.dataset.name === 'directions') {
            editedRecipe[element.dataset.name]
            .splice(element.dataset.index, 1, element.innerHTML)
        }
        else {
            editedRecipe[element.dataset.name] = element.innerHTML
        }

        this.setState({ recipes })
    }

    render() {
        return <App
            {...this.state}
            login={this.login}
            logout={this.logout}
            createNewRecipe={this.createNewRecipe}
            updateRecipe={this.updateRecipe}
        />
    }
}

export default AppContainer
