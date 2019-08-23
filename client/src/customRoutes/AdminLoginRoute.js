import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function AdminLoginRoute({component: Component, loggedIn, history, ...rest}) {
    // debugger;
    return (
        <Route exact path="/admin/login"
        render={routerProps => 
        loggedIn ? (
        <Redirect to="/" />
        ) : (
        <Component {...routerProps} />)} />
    )
}