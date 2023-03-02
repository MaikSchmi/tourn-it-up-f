import React , {useContext} from 'react'
import {AuthContext } from '../../contexts/Auth.context'
import {Navigate} from 'react-router-dom'

function IsPrivate ({children}){
    const {isAuthenticated , isLoading } = useContext(AuthContext)
    return isLoading ? <p>Loading...</p> :!isAuthenticated ? <Navigate to = '/login' /> : children 
} 
export default IsPrivate


