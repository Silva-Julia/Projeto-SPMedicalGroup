import React from 'react';
import { useState, useEffect  } from 'react';
import { parseJwt } from '../services/auth';

import "../assets/css/spmedicalgroup.css";
import logo from "../assets/img/LOGO.png";
import perfil from "../assets/img/man (2) 1.png";

export default function HeaderMedico(){
    const [nome, setNome] = useState([]);

    function buscarDadosStorage() {
        const valorToken = localStorage.getItem('usuario-login');
        console.warn(parseJwt(valorToken));

        if (valorToken != null) {
            setNome(parseJwt(valorToken).name);
        }
    };

    useEffect(buscarDadosStorage, []);
        
    
    return(
            <header className="box_header">
                <div className="container_header">
                    <img className="logo_header" href="index.html" src={logo} alt="LOGO" />

                    <div className="nav_header">
                        <nav>
                            <span> 
                                Dr.{nome}
                                <img  className="nav_redirecionamento" src={perfil}></img>
                            </span>
                        </nav>
                    </div>
                </div>

            </header>
        )
}