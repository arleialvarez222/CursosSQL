import React, { useState, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";
import RegistrarUsuario from "./components/seguridad/RegistrarUsuario";
import Login from "./components/seguridad/Login";
import PerfilUsuario from "./components/seguridad/PerfilUsuario";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grid, Snackbar } from "@material-ui/core";
import AppNavbar from "./components/Navegacion/AppNavbar";
import { useStateValue } from "./Contexto/store";
import { obtenerUsuarioActual } from "./Actions/UsuarioActions";
import RutaSegura from "./components/Navegacion/Bar/RutaSegura";
import NuevoCurso from "./components/cursos/NuevoCurso";
import PaginadorCurso from "./components/cursos/PaginadorCurso";

function App() {
  const [{ sesionUsuario, openSnackbar }, dispatch] = useStateValue();

  const [iniciaApp, setIniciaApp] = useState(false);

  useEffect(() => {
    if (!iniciaApp) {
      obtenerUsuarioActual(dispatch)
        .then((response) => {
          setIniciaApp(true);
        })
        .catch((error) => {
          setIniciaApp(true);
        });
    }
  }, [iniciaApp]);

  return iniciaApp === false ? null : (
    <React.Fragment>
      <Snackbar anchorOrigin={{ vertical:"bottom", horizontal:"center" }} 
      open={openSnackbar ? openSnackbar.open : false} 
      autoHideDuration={3000} 
      ContentProps={{"aria-describedby": "message-id"}} 
      message={
        <span id="message-id" >{openSnackbar ? openSnackbar.mensaje : ""}</span>
      } 
      onClose={ () => 
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje : {
              open: false,
              mensaje : ""
            }
          })
      } >

      </Snackbar>
      <Router>
        <MuiThemeProvider theme={theme}>
          <AppNavbar />
          <Grid container>
            <Switch>
              <Route exact path="/auth/login" component={Login} />
              <Route exact path="/auth/registrar" component={RegistrarUsuario} />

              <RutaSegura exact path="/auth/perfil" component={PerfilUsuario} />
              <RutaSegura exact path="/" component={PerfilUsuario} />
              <RutaSegura exact path="/curso/Nuevo" component={NuevoCurso} />
              <RutaSegura exact path="/curso/lista" component={PaginadorCurso} />

            </Switch>
          </Grid>
        </MuiThemeProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
