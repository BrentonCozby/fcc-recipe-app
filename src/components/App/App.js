import React, {Component} from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

// Components
import Header from '../Header/Header.js'
import Overlay from '../Overlay/Overlay.js'
import MenuButton from '../MenuButton/MenuButton.js'
import Menu from '../Menu/Menu.js'
import Main from '../Main/Main.js'
import LoginContainer from '../../containers/LoginContainer'
import Footer from '../Footer/Footer.js'

// Views
import Collage from '../../views/Collage/Collage.js'
import RecipePage from '../../views/RecipePage/RecipePage.js'

// CSS
import './App.css';
import '../../css/animations.css'

class App extends Component {

    state = {
        isMenuOpen: false,
        isCreatingNewRecipe: false,
        isEditingRecipe: false,
        recipeBeingEdited: null
    }

    static propTypes = {
        recipes: React.PropTypes.array.isRequired,
        user_id: React.PropTypes.string.isRequired,
        login: React.PropTypes.func.isRequired,
        logout: React.PropTypes.func.isRequired,
        createNewRecipe: React.PropTypes.func.isRequired,
        updateRecipe: React.PropTypes.func.isRequired
    }

    toggleMenu = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen })
    }

    hideOverlayThings = () => {
        this.setState({
            isMenuOpen: false
        })
    }

    renderMenu = () => (
        <Menu
            key="menu"
            toggleMenu={this.toggleMenu}
        />
    )

    render() {
        return (
            <div className="App">
                <Header
                    title={"Recipe App"}
                    displayName={this.props.displayName}
                    createNewRecipe={this.props.createNewRecipe}
                />

                <MenuButton toggleMenu={this.toggleMenu} isMenuOpen={this.state.isMenuOpen} />
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="menu"
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}>
                    {this.state.isMenuOpen && this.renderMenu()}
                </ReactCSSTransitionGroup>

                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="fade"
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}>
                    {(this.state.isMenuOpen) &&
                        <Overlay key="overlay" hideOverlayThings={this.hideOverlayThings} />
                    }
                </ReactCSSTransitionGroup>

                <Main>
                    <Switch>
                        <Route exact={true} path="/login" render={() => (
                            <LoginContainer
                                user_id={this.props.user_id}
                                login={this.props.login}
                            />
                        )}/>
                        <Route exact={true} path="/" render={() => (
                            <Redirect to={`/${this.props.user_id}/recipes`} />
                        )} />
                        <Route exact={true} path="/:user_id/recipes" render={({ match }) => {
                            if(this.props.user_id !== match.params.user_id && this.props.user_id === 'demo') return (
                                <Redirect to="/demo/recipes" />
                            )
                            if(this.props.user_id !== match.params.user_id && match.params.user_id === 'demo') return (
                                <Redirect to={`/${this.props.user_id}/recipes`} />
                            )
                            return <Collage
                                user_id={this.props.user_id}
                                recipes={this.props.recipes}
                            />
                        }}/>
                        <Route path="/:user_id/recipes/:recipe_id" render={({ match }) => {
                            if(!this.props.recipes.some(r => {
                                return r.id.toLowerCase() === match.params.recipe_id.toLowerCase()
                            })) return <Redirect to="/demo/recipes"/>
                            if(this.props.user_id !== match.params.user_id && this.props.user_id === 'demo') return (
                                <Redirect to={`/demo/recipes/${match.params.recipe_id}`} />
                            )
                            if(this.props.user_id !== match.params.user_id && match.params.user_id === 'demo') return (
                                <Redirect to={`/${this.props.user_id}/recipes/${match.params.recipe_id}`} />
                            )
                            return <RecipePage
                                updateRecipe={this.props.updateRecipe}
                                recipe={this.props.recipes.find(r => {
                                    return r.id.toLowerCase() === match.params.recipe_id.toLowerCase()
                                })}
                            />
                        }}/>
                    </Switch>
                </Main>

                <Footer />
            </div>
        );
    }
}

export default App;
