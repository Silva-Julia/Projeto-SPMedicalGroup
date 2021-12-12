import React from 'react';

import "../assets/css/spmedicalgroup.css";
import logo from'../assets/img/LOGO.png';
import perfil from "../assets/img/woman (2) 1.png";


export default function HeaderPaciente(){
    // constructor(props)
    //    {
    //         super(props);
    //         this.state = {
    //             nome: '',
    //         }
    //     }

    return(
        <header className="box_header">
        <div className="container_header">
            <img className="logo_header" href="index.html" src={logo} alt="LOGO"/>

            <div className="nav_header">
                <nav>
                    <span> {this.state.nome} <img  className="nav_redirecionamento" src={perfil}/></span>
                </nav>
            </div>
        </div>

    </header>

    )
}