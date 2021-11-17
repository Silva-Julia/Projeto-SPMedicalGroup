import React from 'react';
import "../assets/css/spmedicalgroup.css";
import logo from "../assets/img/LOGO.png";
import redirecionamento from '../../src/assets/img/baseline_format.png';

export default function HeaderAdm()
{
    return(
         <header className="box_header">
             <div className="container_header">
                <img className="logo_header" href="index.html" src={logo} alt="LOGO"></img>
                
                 <nav className="nav_header">
                    <span> Administrador </span>
                    <img className="nav_redirecionamento" src={redirecionamento} alt="Redirecionamento"></img>
                 </nav>

             </div>
         </header>
    )
}