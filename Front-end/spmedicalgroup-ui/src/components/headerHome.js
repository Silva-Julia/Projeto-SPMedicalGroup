import React from 'react';
import { Link } from 'react-router-dom';

import "../assets/css/spmedicalgroup.css";
import logo from "../assets/img/LOGO 2.png";

export default function HeaderHome(){
    return(
        
        <header className="fundo_headerHome">
            <div className="Home">
                <img class="logo_header" src={logo} alt="LOGO"></img> 

                <nav className="nav_headerHome">
                    <Link to="/App.js"><a href=""> Home  </a></Link>
                    <Link><a href=""> Especialidades </a></Link>
                    <Link><a href=""> Sobre a Clínica </a></Link>
                    <Link><a href=""> Endereço </a></Link>
                    <Link><a className="login" href=""> Login </a></Link>
                </nav>
            </div>
            <div className="escrita_banner">
                 <h1> Clínica SP Medical Group </h1>
                 <p> sistema de saúde eficiente, de alta qualidade, focados em dedicar carinho e atenção aos seus pacientes.</p>
            </div>
        </header>
    )
}