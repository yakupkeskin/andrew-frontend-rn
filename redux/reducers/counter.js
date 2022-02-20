//This is the reducer page.
//We define out actions in the counterActions and now we say what these actions will do when called.
const initialState = {
    token: 0,
    username:""
  }
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "RESET":
            return {
                token:0,
                username:""
            }
        case "SET_TOKEN":
            return{
                token:action.token,
                username:action.username
            }
        default:
            return state
    }
  }
export default rootReducer