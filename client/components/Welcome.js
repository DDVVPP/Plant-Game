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
        {/* The navbar will show these links before you log in */}
        <h1> Welcome to the Plant Game! </h1>
        <p>
          Use your keyboard's arrow keys left and right to move your bucket and
          collect 25 raindrops to win! Collecting a lightning bolt decrements
          your points by 5. Click on the start button to begin
        </p>

        <div className="shop-all-btn-div">
          <Link to="/login">
            <button type="button">Login</button>
          </Link>
          <Link to="/signup">
            <button type="button">Sign Up</button>
          </Link>
          <Link to="/game">
            <button type="button">Start</button>
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
