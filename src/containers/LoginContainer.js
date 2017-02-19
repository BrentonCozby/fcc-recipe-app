import React, { Component } from 'react'
import base from '../base'
import defaultRecipes from '../default-recipes'

import Login from '../views/Login/Login.js'

class LoginContainer extends Component {

    state = {
        title: "Login",
        message: "Sign-in to manage your recipes"
    }

    static propTypes = {
        userId: React.PropTypes.string,
        login: React.PropTypes.func.isRequired
    }

    componentWillMount() {
        base.onAuth((user) => {
            if(user) {
                this.authHandler(null, { user })
            }
        })
    }

    authenticate = (event) => {
        const provider = event.target.dataset.provider
        base.authWithOAuthPopup(provider, this.authHandler)
    }

    authHandler = (err, authData) => {
        if(err) {
            if(err.code === "auth/account-exists-with-different-credential") {
                this.setState({
                    title: "Error",
                    message: `An account already exists with the email: ${err.email}`
                })
            }
            return console.error(err)
        }

        // login method from App component
        const login = this.props.login

        Promise.resolve(base.database().ref('users'))
        .then(usersRef => {
            usersRef.once('value', snapshot => {
                const data = snapshot.val() || {}

                if(!data[authData.user.uid]) {
                    base.database().ref('users/' + authData.user.uid).set({
                        recipes: [...defaultRecipes],
                        displayName: authData.user.displayName
                    })
                }
            })
            .then(snapshot => {
                // if user data was found
                if(snapshot.val() && snapshot.val()[authData.user.uid]) {
                    login(snapshot.val()[authData.user.uid], authData.user.uid)
                }
                // else another snapshot is required to get new user data
                else {
                    usersRef.once('value', snapshot => {
                        login(snapshot.val()[authData.user.uid], authData.user.uid)
                    })
                }
            })
        })
    }

    render() {
        return (
            <Login
                user_id={this.props.user_id}
                title={this.state.title}
                message={this.state.message}
                authenticate={this.authenticate}
            />
        )
    }

}

export default LoginContainer
