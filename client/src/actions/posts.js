

export const getPosts = () => {
    return dispatch => {
        return fetch('http://10.0.0.99:3001/api/posts')
        .then(resp => resp.json())
        .then(posts => dispatch({type: "GET_POSTS", posts}))
    }
}

export const addPost = (postData, history) => {
    // debugger;
    let data = new FormData()
    data.append('title', postData.title)
    data.append('body', JSON.stringify(postData.body))
    return dispatch => {
        return fetch('http://10.0.0.99:3001/api/posts', {
            method: "POST",
            headers: {'Content-Type': 'application/json', "Accepts": "application/json" },
            body: JSON.stringify({title: postData.title, body: JSON.stringify(postData.body)})
        })
        .then(resp => resp.json())
        .then(post => dispatch({type: "ADD_POST", post}))
        .then(action => {
            return !!action.post && history.replace(`/posts/drafts/${action.post.id}/edit`)
        })
    }
}

export const isSaving = () => {
    return dispatch => {
        return dispatch({type: "SAVING"})
    }
}


export const updatePost = (id, postData) => {
    return dispatch => {
        return fetch(`http://10.0.0.99:3001/api/posts/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', "Accepts": "application/json" },
            body: JSON.stringify({title: postData.title, body: JSON.stringify(postData.body)})
        })
        .then(resp => resp.json())
        .then(post => dispatch({type: "UPDATE_POST", post}))
        .then(d => setTimeout( () => (dispatch({type: "SAVED"})), 1000))
        .then(data => setTimeout( () => (dispatch({type: "RESET_SAVE_STATE"})), 3000))
    }
}

export const deletePost = id => {
    return dispatch => {
        return fetch(`http://10.0.0.99:3001/api/posts/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id})
        })
        .then(resp => resp.json())
        .then(post => {
            // debugger;
            dispatch({type: 'DELETE_POST', postId: post.id })
        })
        .catch(err => {
            debugger
        })
    }
}