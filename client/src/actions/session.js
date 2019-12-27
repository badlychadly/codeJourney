

// function requestHeaders() {
//     return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
// }

export function loginUser(credentials) {
    return dispatch => {
        return fetch('http://10.0.0.99:3001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({auth: credentials})
        })
        .then(resp => {
          // debugger;
          if (resp.ok) {
            return resp.json()
          }
    
        })
        .then(response => {
            if (!!response.jwt) {
              sessionStorage.setItem('jwt', response.jwt);
              dispatch({type: "LOGIN_SUCESS"});
            } else {
            //   dispatch({type: "LOG_IN_FAIL"})
            }
            // return response.jwt
          })
        .catch(error => {
          debugger;
        }) 
    }
}

export function logoutUser() {
    return dispatch => {
        sessionStorage.removeItem('jwt');
        return dispatch({type: "LOGOUT_USER"})
    }
}