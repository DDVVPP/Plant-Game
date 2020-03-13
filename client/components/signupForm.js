import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */

class disconnectedSignUpForm extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errors: {
        firstName: 'Required',
        lastName: 'Required',
        email: 'Required',
        password: 'Passwords must be at least 6 characters long.'
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    let errors = this.state.errors
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    )

    switch (event.target.name) {
      case 'firstName':
        errors.firstName =
          event.target.value.length < 1 ? 'Your first name is required' : ''
        break
      case 'lastName':
        errors.lastName =
          event.target.value.length < 1 ? 'Your last name is required' : ''
        break
      case 'email':
        errors.email = validEmailRegex.test(event.target.value)
          ? ''
          : 'Email is not valid'
        break
      case 'password':
        errors.password =
          event.target.value.length < 6
            ? 'Password must be 6 characters long'
            : ''
        break
      default:
        break
    }
    this.setState({errors, [event.target.name]: event.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.authorize(
      this.state.email,
      this.state.password,
      this.props.name,
      this.state.firstName,
      this.state.lastName
    )
  }

  render() {
    const {errors} = this.state

    return (
      <div>
        <div className="loginSignupText">
          <h1>Sign up</h1>
        </div>

        <form
          className="loginSignupForm"
          onSubmit={this.handleSubmit}
          // name={name}
        >
          <div className="form-box-loginSignup">
            <div className="contact-loginSignup">
              <div className="column-loginSignup">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
                {errors.firstName.length > 0 && (
                  <span className="error-txt">{errors.firstName}</span>
                )}
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
                {errors.lastName.length > 0 && (
                  <span className="error-txt">{errors.lastName}</span>
                )}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                {errors.email.length > 0 && (
                  <span className="error-txt">{errors.email}</span>
                )}

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                {errors.password.length > 0 && (
                  <span className="error-txt">{errors.password}</span>
                )}
              </div>
              <div className="error-txt-large">
                {!this.props.error
                  ? null
                  : 'Unable to sign you up. Please double-check the information you entered to make sure it is correct.'}
              </div>
            </div>

            <div className="loginSignup-btn-div">
              <button type="submit">Register</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    authorize: (email, password, formName, firstName, lastName) =>
      dispatch(auth(email, password, formName, firstName, lastName))
  }
}

const SignupForm = connect(mapSignup, mapDispatch)(disconnectedSignUpForm)

export default SignupForm

//PROP TYPES
disconnectedSignUpForm.propTypes = {
  error: PropTypes.object
}
