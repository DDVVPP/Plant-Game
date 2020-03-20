import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'
/**
 * COMPONENT
 */

const LoginForm = props => {
  const {name, handleSubmit, error} = props

  return (
    <div className="formDiv">
      <div className="welcomeDiv">
        <h1>Login</h1>
      </div>

      <form onSubmit={handleSubmit} name={name}>
        <div className="fields">
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />

          <span className="error-txt-large">
            {!error
              ? null
              : error.message === 'Wrong username and/or password'
                ? 'Wrong or missing username and/or password'
                : 'Wrong or missing username and/or password'}
          </span>
        </div>

        <div className="loginButtonDiv">
          <button className="loginSignup-btn" type="submit">
            Login
          </button>

          <Link to="/">
            <button className="loginSignup-btn" type="button">
              Home
            </button>
          </Link>
        </div>
      </form>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(LoginForm)

//PROP TYPES
LoginForm.propTypes = {
  name: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
