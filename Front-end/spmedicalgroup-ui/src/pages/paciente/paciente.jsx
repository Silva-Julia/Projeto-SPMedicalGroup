//import { render } from "react-dom/cjs/react-dom.development";
import { Component } from "react";

import HeaderPaciente from '../../components/headerPaciente';
import Footer from '../../components/footer';
import axios from "axios";

export default class Paciente extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaConsultas: [],
        }
    }

    buscarConsultas = () => {
        axios('https://62055ec5161670001741ba6a.mockapi.io/Paciente', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            }
        })

            .then(resposta => {
                if (resposta.status === 200) {
                    this.setState({ listaConsultas: resposta.data })
                    console.log(this.state.listaConsultas)
                }
            })
            .catch(erro => console.log(erro));
    }

    componentDidMount() {
        this.buscarConsultas();
    }




    render() {
        return (
            <div>
                <HeaderPaciente></HeaderPaciente>

                <main>
                    <section className="fundo_paciente">

                        <section className="cont_listaPaciente">

                            <h2> Listar Consulta </h2>

                                        {this.state.listaConsultas.map((consulta) => {
                                            return (
                                                <div className="conteudo_listaConsulta">
                                                    <table className="tabela_lista" id="tabela-lista">
                                                        <tbody>
                                                            <tr key={consulta.id}>
                                                                <td>Dr.{consulta.idUsuario.nomeMedico}</td>
                                                                <td>{consulta.enderecoPaciente}</td>
                                                                <td>{Intl.DateTimeFormat("pt-BR", {
                                                                    year: 'numeric', month: 'numeric', day: 'numeric'
                                                                }).format(new Date(consulta.dataNascimento))}</td>
                                                                <td>{Intl.DateTimeFormat("pt-BR", {
                                                                    hour: 'numeric', minute: 'numeric', hour12: false
                                                                }).format(new Date(consulta.dataNascimento))}</td>
                                                            </tr>
                                                        </tbody>
                                                        
                                                    </table>

                                                </div>
                                            )

                                        })

                                        }

                        </section>

                    </section>
                </main>

                <Footer></Footer>

            </div>
        )
    }
};
