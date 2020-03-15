import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
// import Game from './Game'
import {logout} from '../store'
import {connect} from 'react-redux'
import Modal from 'react-responsive-modal'
import {Login} from './loginForm'
import SignUp from './signupform'

class Welcome extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false
    }
  }

  onOpenModal = () => {
    this.setState({open: true})
  }

  onCloseModal = () => {
    this.setState({open: false})
  }

  render() {
    const {handleClick, isLoggedIn} = this.props
    const {open} = this.state

    return (
      <div>
        {isLoggedIn ? (
          <div>
            <Link to="/scores">My Scores</Link>
            <Link to="/game">
              <button type="button">Start</button>
            </Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            <div className="welcomeDiv">
              {/* The navbar will show these links before you log in */}

              <h1> Welcome to the Plant Game! </h1>
              <p>
                Use your keyboard's left and right arrow keys to move your
                bucket.
              </p>
              <p>Grow your plant by collecting raindrops </p>
              <p>Collect 25 raindrops and, YOU WIN!</p>
              <p>Collect a lightning bolt and your score drops by 5 points.</p>
              <p>Click on the start button to begin</p>
            </div>

            <div className="buttonDiv">
              <button
                type="button"
                className="btn-1"
                onClick={this.onOpenModal}
              >
                Login
              </button>
              <Modal open={open} onClose={this.onCloseModal} little>
                <Login />
              </Modal>

              <Link to="/game">
                <button type="button">Start</button>
              </Link>

              <button type="button" onClick={this.onOpenModal}>
                Sign Up
              </button>
              <Modal open={open} onClose={this.onCloseModal} little>
                <SignUp />
              </Modal>
            </div>
          </div>
        )}
      </div>
    )
  }
}

// /**
//  * CONTAINER
//  */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Welcome)

/**
 * PROP TYPES
 */
Welcome.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
