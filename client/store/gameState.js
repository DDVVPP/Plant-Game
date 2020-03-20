import axios from 'axios'

/**
 * ACTION TYPES
 */
const START_GAME = 'START_GAME'
const STOP_GAME = 'STOP_GAME'

// ACTION CREATORS
export const startGame = isplaying => ({
  type: START_GAME,
  isplaying
})
export const stopGame = notPlaying => ({
  type: STOP_GAME,
  notPlaying
})

// THUNK CREATORS

//these don't need to be async since we aren't accessing the db
export const gameStarted = isplaying => {
  return dispatch => {
    dispatch(startGame(isplaying))
  }
}

export const gameEnded = notPlaying => {
  return dispatch => {
    dispatch(stopGame(notPlaying))
  }
}

// REDUCER
export default function gameState(state = {isPlaying: false}, action) {
  switch (action.type) {
    case START_GAME:
      return {isPlaying: true}
    case STOP_GAME:
      return {isPlaying: false}
    default:
      return state
  }
}
