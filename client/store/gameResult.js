import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_GAMERESULT = 'GET_GAMERESULT'

/**
 * INITIAL STATE
 */
const gameResult = {}

// ACTION CREATORS
export function getGameResult(win, lose, userId) {
  const action = {type: GET_GAMERESULT, win, lose, userId}
  return action
}

// THUNK CREATORS

export const postGameResult = (win, lose, userId) => {
  return async dispatch => {
    const response = await axios.post('/api/gameResult', {win, lose, userId})
    const gameResultData = response.data
    console.log(gameResultData)
    dispatch(getGameResult(gameResultData))
  }
}

// REDUCER
export default function messages(state = {}, action) {
  switch (action.type) {
    case GET_GAMERESULT:
      return gameResult
    default:
      return state
  }
}
