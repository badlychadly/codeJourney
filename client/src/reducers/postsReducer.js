

export default (state = {
    posts: {
        byId: {},
        allIds : []
    }
}
, action) => {
    switch (action.type) {
        case "GET_POSTS":
            return {
                ...state, 
                posts: {
                    byId: action.posts.reduce((acc,p) => ({...acc, [p.id]: p}), {}),
                    allIds: action.posts.map(p => p.id)
                }
            }
        case "ADD_POST":
        return {
            ...state,
            posts: {
                ...state.posts,
                byId: {
                    ...state.posts.byId,
                     [action.post.id]: action.post
                },
                allIds: state.posts.allIds.concat(action.post.id)
            }
        }
        default:
            return state;
    }
}