import React, { Component, useState } from 'react';
import axios from "axios"

import Footer from '../../components/footer';
import HeaderPaginas from '../../components/headerPaginas';

import '../../assets/css/spmedicalgroup.css';

export default class Medico extends Component{
    constructor(props){
        super(props);
        this.state = {
            listaConsultas: [],
            idConsultaAlterada:0,
            idSituaçao:''
        }
    };

    buscaConsultas =() => {
        axios("http://localhost:5000/api/Consultas", {
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('usuario-login')
            }
        })
        .then(resposta => {
            if (resposta.status === 200){
                this.setState({ listaConsultas: resposta.data})
            }
        })
        .catch(erro => console.log(erro));
    }
    componentDidMount(){
        this.buscaConsultas();
    }
}