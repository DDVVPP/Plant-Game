import React, {Component} from 'react'
import {Link} from 'react-router-dom'
// import Game from './Game'

export default class Welcome extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="loginSignupText">
        <h1> Welcome! Please click start to play the game </h1>
        <div className="shop-all-btn-div">
          <Link to="/game">
            <button type="button">START</button>
          </Link>
        </div>
      </div>
    )
  }
}
