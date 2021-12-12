import React from 'react';
import { parseJwt, usuarioAutenticado } from './services/auth.js';

import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Redirect, Switch, } from 'react-router-dom';


import './index.css';

import Home from '../src/pages/home/App';
import Login from '../src/pages/login/Login';
import Administrador from '../src/pages/administrador/adm';
import Medico from '../src/pages/medico/medico';
import Paciente from '../src/pages/paciente/paciente';
import NotFound from '../src/pages/notFound/NotFound';


import reportWebVitals from './reportWebVitals';


const PermissaoAdmin = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '1' ? (
        // operador spread
        <Component {...props} />
      ) : (
        <Redirect to="/Login" />
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
        <Redirect to="/Login" />
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
        <Redirect to="/Login" />
      )
    }
  />
);



const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/home" component={Home} /> 
        <Route path="/login" component={Login} /> 
        <Route path="/administrador" component={Administrador} /> 
        <Route path="/medico" component={Medico} /> 
        <Route path="/paciente" component={Paciente} /> 

        <PermissaoAdmin path = "/Admin" component={Administrador} />
        <PermissaoMédico path = "/ConsultaMedico" component={Medico} />
        <PermissaoComum path = "/ConsultaPaciente" component={Paciente} />
        
        <Route path="/notFound" component={NotFound} /> 
        <Redirect to="/notFound" /> {/* Redireciona para Not Found caso não encontre nenhuma rota */}
      </Switch>
    </div>
  </Router>
);



ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();