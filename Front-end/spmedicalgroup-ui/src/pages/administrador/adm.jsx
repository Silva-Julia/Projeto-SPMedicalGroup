import React, { Component } from 'react';
import axios from "axios";

import Footer from '../../components/footer';
import HeaderAdm from '../../components/headerAdm';

import '../../assets/css/spmedicalgroup.css';

export default class Administrador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaConsultas: [],
            IdPaciente: '',
            IdMedico: '',
            IdSituacao: 0,
            dataConsulta: new Date(),
            loading: false,
            errorMessage: '',
        }
    };

    // buscaPacientes = () => {
    //     axios("http://localhost:5000/api/Paciente", {
    //         headers: {
    //             'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
    //         }
    //     })
    //         .then(resposta => {
    //             if (resposta.status === 200) {
    //                 this.state({ listaPacientes: resposta.data })
    //                 console.log(this.state.listaPacientes)
    //             }
    //         })
    //         .catch(erro => console.log(erro))
    // }

    // buscaMedicos = () => {
    //     axios("http://localhost:5000/api/Medico", {
    //         headers: {
    //             'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
    //         }
    //     })
    //         .then(resposta => {
    //             if (resposta.status === 200) {
    //                 this.state({ listaMedicos: resposta.data })
    //                 console.log(this.state.listaMedicos)
    //             }
    //         })
    //         .catch(erro => console.log(erro))
    // }

    // buscaSituacoes = () => {
    //     axios("http://localhost:5000/api/situacoes", {
    //         headers: {
    //             'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
    //         }
    //     })
    //         .then(resposta => {
    //             if (resposta.status === 200) {
    //                 this.state({ listaSituacao: resposta.data })
    //                 console.log(this.state.listaSituacao)
    //             }
    //         })
    //         .catch(erro => console.log(erro))
    // }

    buscaConsultas = () => {
        axios("http://localhost:5000/api/Consultas", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    this.state({ listaConsultas: resposta.data })
                    console.log(this.state.listaConsultas)
                }
            })
            .catch(erro => console.log(erro))
    }

    componentDidMount() {
        this.buscarConsultas();
    }

    cadastrarConsulta = (event) => {
        event.preventDefault();
        this.setState({ loading: true })

        let consulta = {
            IdPaciente: this.state.IdPaciente,
            IdMedico: this.state.IdMedico,
            dataConsulta: new Date(this.state.dataConsulta),
            IdSituacao: this.state.IdSituacao
        };

        this.setState({ loading: true });

        axios.post("http://localhost:5000/api/Consultas", consulta, {
            headers: {
                'Authoriztion': 'Bearer' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 201) {
                    console.log('foi !!!')
                    this.setState({
                        IdPaciente: '',
                        IdMedico: '',
                        IdSituacao: 0,
                        dataConsulta: new Date(),
                        nomeUsuario: '',
                        loading: false,
                        errorMessage: '',
                    })
                }
            })
            .catch(erro => {
                console.log(erro);
                this.setState({
                    errorMessage: 'Dados inválidos',
                    loading: false
                });
            })
            // .then(this.buscaConsultas);
    }


    // componentDidMount() {
    //     this.buscaConsultas();
    //     this.buscaPacientes();
    //     this.buscaMedicos();
    //     this.buscaSituacoes();
    // }

    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value })
    }




    render() 
    {
        return (
            <div>
                    <HeaderAdm></HeaderAdm>

                    <main>
                        <section className="area_fundo">

                            <section className="cadasConsulta">
                                    <div className="conteudo_cadasConsulta">
                                        <h2> Cadastrar Consulta </h2>

                                        <form  action="" onSubmit={ this.cadastrarConsulta} className="box_cadasConsulta">
                                            <div className="linha_escrita_consulta">
                                                <input
                                                    className="input__consulta"
                                                    placeholder="Nome Medico"
                                                    type="text"
                                                    name="Nome Medico"
                                                    id=""                                               
                                                    value={this.state.IdMedico}
                                                    onChange={this.atualizaStateCampo}
                                                />
                                            </div>

                                            <div className="linha_escrita_consulta">
                                                <input
                                                    className="input__consulta"
                                                    placeholder="Situação"
                                                    type="text"
                                                    name="Situação"
                                                    id=""
                                                    value={this.state.IdSituacao}
                                                    onChange={this.atualizaStateCampo}
                                                />
                                            </div>

                                            <div className="linha_escrita_consulta">
                                                <input
                                                    className="input__consulta"
                                                    placeholder="Nome Paciente"
                                                    type="text"
                                                    name="Nome Paciente"
                                                    id=""
                                                    value={this.state.IdPaciente}
                                                    onChange={this.atualizaStateCampo}
                                                />
                                            </div>

                                            <div className="linha_escrita_consulta">
                                                <input
                                                    className="input__consulta"
                                                    placeholder="Data da Consulta"
                                                    type="date"
                                                    name="Data da Consulta"
                                                    id="consulta__data"
                                                    value={this.state.dataConsulta}
                                                    onChange={this.atualizaStateCampo}
                                                />
                                            </div>

                                            <div className="linha_escrita_consulta">
                                                <input
                                                    className="input__consulta"
                                                    placeholder="Horário"
                                                    type="time"
                                                    name="Horário"
                                                    id="consulta__horario"
                                                />
                                            </div>

                                            <p style={{ color: 'red', textAlign: 'center' }}>{this.state.erroMensagem}</p>
                                            
                                            {this.state.loading === true &&(
                                                    <div className="boton_Consulta">
                                                        <button type="submit" className="btn__consulta" id="" disabled>
                                                            Carregando...
                                                        </button>
                                                    </div>
                                            )}

                                            {this.state.loading === false &&(
                                                <div className="boton_Consulta">
                                                    <button type="submit"className="btn__consulta" id=""
                                                        disabled={
                                                            this.state.IdMedico === '' || this.state.IdSituacao === '' || this.state.IdPaciente === '' ||  this.state.dataConsulta === '' 
                                                                ? 'none'
                                                                : ''
                                                        }
                                                    > Cadastrar
                                                    </button>
                                                </div>
                                            )}
                                        </form>
                                    </div>

                             </section >



                                <section className="cont_listarConsulta">

                                    <h2> Listar Consulta </h2>

                                     <div className="conteudo_listaConsulta">
                                         <table className="tabela_lista" id="tabela-lista">
                                            <tbody>

                                                {this.state.listaConsultas.map((consulta) => {
                                                    return(
                                                        <tr key={consulta.idConsulta}>
                                                            <td> {consulta.idMedicoNavigation.idUsuarioNavigation.nomeUsuario}</td>
                                                            <td> {consulta.idPacienteNavigation.idUsuarioNavigation.nomeUsuario}</td>
                                                            <td> {consulta.idSituacaoNavigation.descricaoSituacao}</td>
                                                            <td> {Intl.DateTimeFormat("pt-BR", {
                                                                year: 'numeric', month: 'numeric', day: 'numeric'      
                                                                }).format(new Date(consulta.dataConsulta))} </td>
                                                            <td> {Intl.DateTimeFormat("pt-BR", {
                                                                hour: 'numeric', minute: 'numeric', hour12: false
                                                                }).format(new Date(consulta.dataConsulta))} </td>
                                                        </tr>
                                                    )
                                                 })

                                                 }

                                            </tbody>
                                         </table>
                                    </div>

                                </section>
                            
                         </section>
                        
                         </main>

                         <Footer></Footer>

             </div>
        );
    }
}