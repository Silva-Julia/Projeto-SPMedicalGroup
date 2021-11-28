import React from 'react';

import "../assets/css/spmedicalgroup.css";
import logo from'../assets/img/LOGO.png';
import perfil from "../assets/img/woman (2) 1.png";


export default function HeaderPaciente(){
 
    return(
        <header class="box_header">
        <div class="container_header">
            <img class="logo_header" href="index.html" src={logo} alt="LOGO"/>

            <div class="nav_header">
                <nav>
                    <span> Ligia <img  class="nav_redirecionamento" src={perfil}/></span>
                </nav>
            </div>
        </div>

    </header>

    )
}