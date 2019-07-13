

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
            return {...state, 
                posts: postsReducer(state.posts, action)
            }
        case "ADD_POST":
        return {
            posts: addPostReducer(state.posts, action),
            currentPost: currentPostReducer(state.currentPost, action)
        }
        case "UPDATE_POST":
        const post = state.posts.byId[action.post.id]
        // debugger;
            return {
                ...state,
                ...state.posts,
                byId: {
                    ...state.posts.byId,
                    [post.id]: action.post
                }
            }

        case "DELETE_POST":
        const {[action.id]: _, ...newById} = state.posts.byId
        const allIds = state.posts.allIds
        let toDeleteIndex = allIds.indexOf(action.id)
        return {
            ...state,
            ...state.posts,
            byId: {
                ...newById
            },
            allIds: [
                ...allIds.slice(0, toDeleteIndex),
                ...allIds.slice(toDeleteIndex + 1)
            ]
            
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

function addPostReducer(state, action) {
    return {
        byId: {
            ...state.byId,
             [action.post.id]: action.post
        },
        allIds: state.allIds.concat(action.post.id)
    }
}

function currentPostReducer(state, action) {
    return action.post
}