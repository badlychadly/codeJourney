

export default (state = {
    posts: {
        byId: {},
        allIds : []
    }
}
, action) => {
    switch (action.type) {
        case "GET_POSTS":
        // debugger;
            return {
                ...state, 
                posts: {
                    byId: action.posts.reduce((acc,p) => ({...acc, [p.id]: p}), {}),
                    allIds: action.posts.map(p => p.id)
                }
            }
        case "ADD_POST":
        debugger;
        return {}
        default:
            return state;
    }
}