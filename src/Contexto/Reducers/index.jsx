import sesionUsuarioReducer from './SesionUsuarioReducer';
import openSnackbarReducer from './OpenSnackbarReducer';


export const mainReducer = ({ sesionUsuario, openSnackbar }, action) => {
    return {
        sesionUsuario: sesionUsuarioReducer(sesionUsuario, action),
        openSnackbar: openSnackbarReducer(openSnackbar, action)
    }
}