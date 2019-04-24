

export const getPosts = () => {
    return dispatch => {
        return fetch('http://10.0.0.99:3001/api/posts')
        .then(resp => resp.json())
        .then(posts => dispatch({type: "GET_POSTS", posts}))
    }
}