import React from 'react'
import { AppBar } from '@material-ui/core'
import BarSesion from './BarSesion'
import { useStateValue } from '../../Contexto/store';

const AppNavbar = () => {

    const [{sesionUsuario}, dispatch] = useStateValue();

     return sesionUsuario 
     ?  (sesionUsuario.autenticado == true ? <AppBar position="static"> <BarSesion /></AppBar> : null)
        : null; 
    /* return ( 
    <AppBar position="static">
        <BarSesion />
        </AppBar> 
    ); */


};

export default AppNavbar
