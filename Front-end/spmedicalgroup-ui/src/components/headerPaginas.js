import React from 'react';
import "../assets/css/spmedicalgroup.css";
import logo from "../assets/img/LOGO.png";
import perfil from "../assets/img/man (2) 1.png";

export default function HeaderPaginas()
{
    return(
         <header className="box_header">
            <div className="container_header">
                <img className="logo_header" href="index.html" src={logo} alt="LOGO" />

                <div className="nav_header">
                    <nav>
                        <span> Dr. Ricardo Lemos </span>
                        <images  className="nav_redirecionamento" src={perfil}></images>
                    </nav>
                </div>
            </div>

         </header>
    )
}