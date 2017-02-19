import React from 'react'
import { Link } from 'react-router-dom'

import './Login.css'

const Login = ({ user_id, title, message, authenticate }) => (
    <div className="Login">
        <h2 className="login-title">{title}</h2>
        <p className="login-message">{message}</p>
        <div className="login-buttons">
            <button className="login-btn github" data-provider="github" onClick={authenticate}>GitHub Login</button>
            <button className="login-btn facebook" data-provider="facebook" onClick={authenticate}>Facebook Login</button>
            <button className="login-btn twitter" data-provider="twitter" onClick={authenticate}>Twitter Login</button>
            <Link className="go-home" to={`/${user_id}/recipes`} >Go Home</Link>
        </div>
    </div>
)

Login.propTypes = {
    title: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired,
    authenticate: React.PropTypes.func.isRequired
}

export default Login
