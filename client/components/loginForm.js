import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const LoginForm = props => {
  const {name, handleSubmit} = props

  return (
    <div>
      <div className="loginSignupText">
        <h1>Login</h1>
      </div>

      <form className="loginSignupForm" onSubmit={handleSubmit} name={name}>
        <div className="form-box-loginSignup">
          <div className="contact-loginSignup">
            <div className="column-loginSignup">
              <input type="email" name="email" placeholder="Email" />
              <input type="password" name="password" placeholder="Password" />
            </div>
          </div>
          <div className="error-txt-large">
            {!props.error ? null : 'Wrong username and/or password'}
          </div>
          <div className="loginSignup-btn-div">
            <button type="submit">Login</button>
          </div>
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
