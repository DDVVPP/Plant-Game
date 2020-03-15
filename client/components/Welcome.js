import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
// import Game from './Game'
import {logout} from '../store'
import {connect} from 'react-redux'

const Welcome = ({handleClick, isLoggedIn}) => (
  <div>
    {isLoggedIn ? (
      <div>
        <Link to="/scores">My Scores</Link>
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
            Use your keyboard's left and right arrow keys to move your bucket.
          </p>
          <p>Grow your plant by collecting raindrops </p>
          <p>Collect 25 raindrops and, YOU WIN!</p>
          <p>Collect a lightning bolt and your score drops by 5 points.</p>
          <p>Click on the start button to begin</p>
        </div>
        <div className="buttonDiv">
          <Link to="/login">
            <button type="button" className="btn-1">
              Login
            </button>
          </Link>
          <Link to="/game">
            <button type="button">Start</button>
          </Link>
          <Link to="/signup">
            <button type="button">Sign Up</button>
          </Link>
        </div>
      </div>
    )}
  </div>
)

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
