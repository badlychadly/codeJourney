

export default function combinePostReducers(state = {
    posts: {
        byId: {},
        allIds : []
    },
    currentPost: {},
    loggedIn: !!sessionStorage.jwt,
    ui: {isSaving: false, saveSuccess: false}
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
        // debugger;
            return {
                ...state,
                posts: updatePostReducer(state.posts, action)
            }

        case "SAVING":
        // debugger;
            return {
                ...state,
                ui: {isSaving: true, saveSuccess: state.ui.saveSuccess}
            }

        case "SAVED":
        // debugger;
            return {
                ...state,
                ui: {...state.ui, saveSuccess: true}
            }

        case "DELETE_POST":
        // USE CONSOLE.TIME TO SEE IF ARRAY.FILTER IS FASTER
            return {...state, posts: deletePostReducer(state.posts, action)}
        case "LOGIN_SUCESS":
            return {...state, loggedIn: !!sessionStorage.jwt}
        case "LOGOUT_USER":
            return {...state, loggedIn: !!sessionStorage.jwt}
        
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

function deletePostReducer(state, action) {
    const {[action.postId]: _, ...newById} = state.byId
    const allIds = state.allIds
    let toDeleteIndex = allIds.indexOf(action.postId)
        // debugger;
    return {
        byId: {
            ...newById
        },
        allIds: [
            ...allIds.slice(0, toDeleteIndex),
            ...allIds.slice(toDeleteIndex + 1)
        ] 
    }
}

function updatePostReducer(state, action) {
    const post = state.byId[action.post.id]
    return {
        ...state,
        byId: {
            ...state.byId,
            [post.id]: action.post
        }
    }
}