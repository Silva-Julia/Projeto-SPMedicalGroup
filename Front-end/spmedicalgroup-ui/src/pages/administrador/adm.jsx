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
            listaPacientes: [],
            listaMedicos: [],
            listaSituacao: [],
            IdPaciente: '',
            IdMedico: '',
            IdSituacao: 0,
            dataConsulta: new Date(),
            nomeUsuario: '',
        }
    };

    buscaPacientes = () => {
        axios("http://localhost:5000/api/Paciente", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    this.state({ listaPacientes: resposta.data })
                    console.log(this.state.listaPacientes)
                }
            })
            .catch(erro => console.log(erro))
    }

    buscaMedicos = () => {
        axios("http://localhost:5000/api/Medico", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    this.state({ listaMedicos: resposta.data })
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
                    this.state({ listaSituacao: resposta.data })
                    console.log(this.state.listaSituacao)
                }
            })
            .catch(erro => console.log(erro))
    }

    buscaConsultas = () => {
        axios("http://localhost:5000/api/Consultas", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    this.state({ listaConsultas: resposta.data })
                }
            })
            .catch(erro => console.log(erro))
    }

    cadastrarConsulta = (event) => {
        event.preventDefault();

        let consulta = {
            IdPaciente: this.state.IdPaciente,
            IdMedico: this.state.IdMedico,
            dataConsulta: new Date(this.state.dataConsulta),
            IdSituacao: this.state.IdSituacao
        };
        axios.post("http://localhost:5000/api/Consultas", consulta, {
            headers: {
                'Authoriztion': 'Bearer' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 201) {
                    console.log('foi !!!')
                }
            })
            .catch(erro => {
                console.log(erro);
            })
            .then(this.buscaConsultas);
    }


    componentDidMount() {
        this.buscaConsultas();
        this.buscaPacientes();
        this.buscaMedicos();
        this.buscaSituacoes();
    }

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

                                        <form  onSubmit={ this.cadastrarConsulta} className="box_cadasConsulta">
                                            <div className="linha_escrita_consulta">
                                                <input
                                                    className="input__consulta"
                                                    placeholder="Nome Medico"
                                                    type="text"
                                                    name="Nome Medico"
                                                    id="consulta__nomeMed"                                               
                                                    value={this.state.IdMedico}
                                                    onChange={this.atualizaStateCampo}
                                                />
                                                {/* <option value="0"> Insira o nome do Medico </option> */}
                                                {
                                                    this.state.listaMedicos.map(medico => {
                                                        return(
                                                            <option key={medico.IdMedico} value={medico.idMedico}> {medico.nomeUsuario} </option>
                                                        );
                                                    })
                                                }
                                            </div>

                                            <div className="linha_escrita_consulta">
                                                <input
                                                    className="input__consulta"
                                                    placeholder="Situação"
                                                    type="text"
                                                    name="Situação"
                                                    id="consulta__situacao"
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
                                                    id="consulta__nomePac"
                                                    value={this.state.IdPaciente}
                                                onChange={this.atualizaStateCampo}
                                                />
                                                { this.state.listaPacientes.map(paciente =>{
                                                    return(
                                                        <option key={paciente.IdPaciente} value={paciente.idPaciente}> {paciente.nomePaciente}</option>
                                                    );
                                                })
                                                }
                                            </div>

                                            <div className="linha_escrita_consulta">
                                                <input
                                                    className="input__consulta"
                                                    placeholder="Data da Consulta"
                                                    type="date"
                                                    name="Data da Consulta"
                                                    id="consulta__data"
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

                                            {this.state.isLoading === true &&(
                                                    <div className="boton_Consulta">
                                                        <button type="submit" className="btn__consulta" id="btn__consulta" disabled>
                                                            Carregando...
                                                        </button>
                                                    </div>
                                            )}

                                            {this.state.isLoading === true &&(
                                                <div className="boton_Consulta">
                                                    <button type="submit"className="btn__consulta" id="btn__consulta">
                                                        Cadastrar
                                                    </button>
                                                </div>
                                            )}
                                        </form>
                                    </div>

                             </section >



                                <section className="cont_listarConsulta">

                                    <h2> Listar Consulta </h2>

                                     <div className="conteudo_listaConsulta">
                                        {this.state.listaConsultas.map((consulta) => {
                                            return(
                                                <table className="tabela_lista">
                                                    <tr key={consulta.idConsulta}></tr>
                                                    {/* <th><images src={perfil}/> </th> */}
                                                    <p> {consulta.idMedicoNavigation.nomeMedico}</p>
                                                    <p> {consulta.idPacienteNavigation.nomePaciente}</p>
                                                    <p> {consulta.idSituacaoNavigation.IdSituacao}</p>
                                                    <p> {Intl.DateTimeFormat("pt-BR", {
                                                        year: 'numeric', month: 'numeric', day: 'numeric'      
                                                        }).format(new Date(consulta.dataConsulta))} </p>
                                                    <p> {Intl.DateTimeFormat("pt-BR", {
                                                         hour: 'numeric', minute: 'numeric', hour12: false
                                                        }).format(new Date(consulta.dataConsulta))} </p>
                                                </table>
                                            )
                                        })}
                                    </div>

                                </section>
                            
                         </section>
                        
                         </main>

                         <Footer></Footer>

             </div>
        );
    }
}