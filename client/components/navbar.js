import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <header className="site-head">
      {isLoggedIn ? (
        <div className="site-head-container">
          <h2>
            {/* The navbar will show these links after you log in */}
            Plant Game
          </h2>

          <div className="site-head-right">
            <Link to="/scores">My Scores</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div className="site-head-container">
          {/* The navbar will show these links before you log in */}
          <h2> Plant Game</h2>

          <div className="site-head-right">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </div>
        </div>
      )}
      <hr />
    </header>
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

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
