

export default function combinePostReducers(state = {
    posts: {
        byId: {},
        allIds : []
    },
    currentPost: {}
}
, action) {
    switch (action.type) {
        case "GET_POSTS":
            return {posts: postsReducer(state.posts, action)}
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
        case "UPDATE_POST":
        const post = state.posts.byId[action.post.id]
        debugger;
            return {
                ...state,
                ...state.posts,
                byId: {
                    ...state.posts.byId,
                    [action.post.id]: {
                        ...post,
                        ...action.post
                    }
                }
            }
        default:
            return state;
    }
}

function postsReducer(state, action) {
    return { 
        byId: action.posts.reduce((acc,p) => ({...acc, [p.id]: p}), {}),
        allIds: action.posts.map(p => p.id)
    }
}