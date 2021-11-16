import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch,
} from 'react-router-dom';


import './index.css';

import Home from '../src/pages/home/App';
import Login from '../src/pages/login/Login';
import NotFound from '../src/pages/notFound/NotFound';


import reportWebVitals from './reportWebVitals';


const PermissaoAdmin = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '1' ? (
        // operador spread
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);


const PermissaoComum = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '2' ? (
        // operador spread
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);


const PermissaoMédico = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '3' ? (
        // operador spread
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);



const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/home" component={App} /> {/* Home */}
        <Route path="/login" component={Login} /> {/* Login */}
        {/* <PermissaoAdm path="/tiposEventos" component={TiposEventos} /> Tipos Eventos */}
        {/* <PermissaoAdm path="/eventosAdm" component={EventosAdm} /> Eventos Adm */}
        {/* <PermissaoComum path="/meusEventos" component={MeusEventos} /> Meus Eventos */}
        {/* <PermissaoAdm path="/tiposUsuarios" component={TiposUsuarios} /> Tipos Usuários */}
        {/* <Route path="/perfil" component={Perfil} /> Perfil */}
        <Route path="/notFound" component={NotFound} /> {/* Not Found */}
        <Redirect to="/notFound" /> {/* Redireciona para Not Found caso não encontre nenhuma rota */}
      </Switch>
    </div>
  </Router>
);



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
