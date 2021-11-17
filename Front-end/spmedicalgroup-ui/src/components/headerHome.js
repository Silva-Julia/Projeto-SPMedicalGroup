import React from 'react';
import "../assets/css/spmedicalgroup.css";
import logo from "../assets/img/LOGO 2.png";

export default function HeaderHome(){
    return(
        
        <header className="fundo_headerHome">
            <div className="Home">
                <img class="logo_header" src={logo}></img>

                <nav className="nav_headerHome">
                        <a> Home </a>
                        <a> Especialidades </a>
                        <a> Sobre a Clínica </a>
                        <a> Endereço </a>
                        <a className="login" href="login.html"> Login </a>
                </nav>
            </div>
            <div className="escrita_banner">
                <h1> Clínica SP Medical Group </h1>
                 <p> sistema de saúde eficiente, de alta qualidade, focados em dedicar carinho e atenção aos seus pacientes.</p>
            </div>
        </header>
    )
}