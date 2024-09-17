

import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

export default function ProtectedRoot({children}) {
    const { user } = useSelector((state) => state.auth);
    if(user!==null){
        return children
    }else{
        return <Navigate to="/"></Navigate>
    }
}
