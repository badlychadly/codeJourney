

export const getPosts = () => {
    return dispatch => {
        return fetch('http://10.0.0.99:3001/api/posts')
        .then(resp => resp.json())
        .then(posts => dispatch({type: "GET_POSTS", posts}))
    }
}

export const addPost = (postData) => {
    return dispatch => {
        return fetch('http://10.0.0.99:3001/api/posts', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postData)
        })
        .then(resp => resp.json())
        .then(post => dispatch({type: "ADD_POST", post}))
    }
}