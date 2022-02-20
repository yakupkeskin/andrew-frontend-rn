//We use redux for state management
//This is like defining global variables.
//So we can use these variables in any component
// Action creators
export const reset = () => ({ //This is an actions for reset the all values inside the state.
    type: "RESET"
})

export const SetToken = (token,username) => ({  //This is for set the state with income values.
    type:"SET_TOKEN",
    token:token,
    username:username
})
