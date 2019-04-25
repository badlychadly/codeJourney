

export default (state = {
    posts: {
        byId: {},
        allIds : []
    }
}
, action) => {
    switch (action.type) {
        case "GET_POSTS":
        // debugger
            return {
                ...state, 
                posts: {
                    byId: {
                        ...action.posts.map(p => ({...p.id, ...p}))
                    }
                }
            }
        default:
            return state;
    }
}