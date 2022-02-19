
// Action creators
export const reset = () => ({
    type: "RESET"
})

export const SetToken = (token,username) => ({
    type:"SET_TOKEN",
    token:token,
    username:username
})
