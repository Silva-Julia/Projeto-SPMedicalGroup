import React from 'react';
import "../assets/css/spmedicalgroup.css";
import logo from "../assets/img/LOGO 2.png";

export default function HeaderHome(){
    return(
        
        <header className="fundo_headerHome">
            <div className="Home">
                <img class="logo_header" src={logo} alt="LOGO"></img> 

                <nav className="nav_headerHome">
                    <a href="App.js"> Home  </a>
                    <a href="secao_especialidade"> Especialidades </a>
                    <a href="box_MaisSobre"> Sobre a Clínica </a>
                    <a href="endereço"> Endereço </a>
                    <a className="login" href="#Login"> Login </a>
                </nav>
            </div>
            <div className="escrita_banner">
                 <h1> Clínica SP Medical Group </h1>
                 <p> sistema de saúde eficiente, de alta qualidade, focados em dedicar carinho e atenção aos seus pacientes.</p>
            </div>
        </header>
    )
}