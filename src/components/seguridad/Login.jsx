import React, { useState } from 'react'
import style from '../tool/style'
import { Avatar, Button, Container, TextField, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { loginUsuario } from '../../Actions/UsuarioActions';
import { withRouter } from 'react-router-dom';
import { useStateValue } from '../../Contexto/store';

const Login = (props) => {

    const [{sesionUsuario}, dispatch ] = useStateValue();
    const [usuario, setUsuario] = useState({
        Email : '',
        Password : ''
    })

    const ingresarValoresMemoria = e => {
        const {name,value} = e.target;
        setUsuario(anterior => ({
            ...anterior,
            [name] : value
        }));
    }

    const loginUsuarioBoton = e => {
        e.preventDefault();
        loginUsuario({Email : usuario.Email, Password : usuario.Password}, dispatch).then(response => {

            if(response.status === 200){
                window.localStorage.setItem("token_seguridad", response?.data?.token);
                props.history.push("/");
            }else{
                dispatch({
                    type : "OPEN_SNACKBAR",
                    openMensaje :{
                        open: true,
                        mensaje : "Las credenciales del usuario son incorrectas"
                    }
                })
            }

        });
    }

    return (
            <Container component="main" maxWidth="xs" justify="center">
                <div style={style.paper} >
                    <Avatar style={style.avatar}>
                        <LockOutlinedIcon style={style.icon} />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login de usuario
                    </Typography>
                    <form style={style.form}>
                        <TextField name="Email" value={usuario?.Email} onChange={ingresarValoresMemoria} variant="outlined" label="Ingrese su Email"  fullWidth     margin="normal" />
                        <TextField name="Password" value={usuario?.Password} onChange={ingresarValoresMemoria}  variant="outlined" type="password" label="Password"  fullWidth margin="normal" />

                        <Button type="submit" onClick={loginUsuarioBoton} fullWidth variant="contained" color="primary" style={style.submit} >
                            Enviar
                        </Button>
                    </form>
                </div>
            </Container>
    )
}

export default withRouter(Login);
