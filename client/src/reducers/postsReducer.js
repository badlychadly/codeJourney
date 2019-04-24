

export default (state = {
    posts: []
}, action) {
    switch (action.type) {
        case "GET_POSTS":
            return state 
        default:
            return state;
    }
}