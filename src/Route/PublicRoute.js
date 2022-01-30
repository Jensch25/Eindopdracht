import React from "react";
import {Route, Navigate} from 'react-router-dom'
import { auth } from "../hooks/firebase";


const PublicRoute = ({component:Component, restricted,...rest}) => {
    const user = auth.currentUser
    return (
        <Route {...rest} render={props => (
            user && restricted ?
                <Navigate to="/" />
                : <Component {...props} />
        )} />
    )
}

export default PublicRoute

