import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_GAMERESULT = 'GET_GAMERESULT'

// ACTION CREATORS
export const getGameResult = (win, lose, userId) => ({
  type: GET_GAMERESULT,
  win,
  lose,
  userId
})

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
export default function gameResult(state = {}, action) {
  switch (action.type) {
    case GET_GAMERESULT:
      return gameResult
    default:
      return state
  }
}
