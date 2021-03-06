import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { useStateValue } from '../../../Contexto/store'

function RutaSegura({component :  Component, ...rest }){
    const [{sesionUsuario}, dispatch] = useStateValue();

    return (
        <Route 
            {...rest}
            render = { (props) => 
            sesionUsuario ? (
                sesionUsuario.autenticado == true ? (
                    <Component {...props} {...rest} />
                ) :
                <Redirect to="/auth/login" />     
            ) : <Redirect to="/auth/login" />
                
        } />
    )
}


export default RutaSegura;