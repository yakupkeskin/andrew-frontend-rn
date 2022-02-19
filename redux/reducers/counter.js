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