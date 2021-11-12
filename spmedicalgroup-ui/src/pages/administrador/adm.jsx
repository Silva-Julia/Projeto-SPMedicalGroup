import React, {Component} from 'react';
import axios from "axios";

import Header from '../../components/header';
import Footer from '../../components/footer';

import '../../assets/css/spmedicalgroup.css';

export default class Adm extends Component{

    constructor(props){
        super(props)
        {
            this.state = {
                listaConsultas : [],
                listaPacientes: [],
                listaMedicos:[],
                listaSituacao:[],
                IdPaciente : 0,
                IdMedico : 0,
                IdSituacao:0,
                dataConsulta : new Date,
            }
        }
    };

    buscaPacientes = () => {
        axios("http://localhost:5000/api/pacientes", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
              }
        })
        .then(resposta => {
            if (resposta.status === 200) {
                this.state({listaPacientes: resposta.data})
                console.log(this.state.listaPacientes)
            }
        })
        .catch(erro => console.log(erro))
    }

    buscaMedicos = () => {
        axios("http://localhost:5000/api/medicos", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
              }
        })
        .then(resposta => {
            if (resposta.status === 200) {
                this.state({listaMedicos: resposta.data})
                console.log(this.state.listaMedicos)
            }
        })
        .catch(erro => console.log(erro))
    }

    buscaSituacoes = () => {
        axios("http://localhost:5000/api/situacoes", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
              }
        })
        .then(resposta => {
            if (resposta.status === 200) {
                this.state({listaSituacao: resposta.data})
                console.log(this.state.listaSituacao)
            }
        })
        .catch(erro => console.log(erro))
    }

    buscaConsultas = () => {
        axios("http://localhost:5000/api/Consultas/listarTodas", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
              }
        })
        .then(resposta => {
            if (resposta.status === 200) {
                this.state({listaConsultas: resposta.data})
            }
        })
        .catch(erro => console.log(erro))
    }

    cadastrarConsulta = (event) => {
        
    }
}