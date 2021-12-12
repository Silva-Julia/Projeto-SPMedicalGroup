//import { render } from "react-dom/cjs/react-dom.development";
import { Component } from "react";

import HeaderPaciente from '../../components/headerPaciente';
import Footer from '../../components/footer';

export default class Paciente extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            listaConsultas: [],
            idConsulta: '',
            nomeMedico: '',
            dataConsulta: '',
            idSituacao: '',
            erro: '',
            isLoading: false,
        }
    }

    buscarConsultas = () => {
        fetch('http://localhost:5000/api/Consulta/Paciente',{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            }
        })

        .then((resposta) => resposta.json())
        .then((dados) => this.setState({ listaConsultas: dados}))
        .catch((erro) => console.log(erro))
    }

    componentDidMount()
    {
        this.buscarConsultas();
    }




    render()
    {
        return(
            <div>
                <HeaderPaciente></HeaderPaciente>
    
                <main>
                    <section className="fundo_paciente">
    
                        <section className="cont_listaPaciente">
    
                            <h2> Listar Consulta </h2>
                            <div className="conteudo_listaConsulta">
                                <table className="tabela_lista" id="tabela-lista">
                                    {this.state.listaConsultas.map((consulta)=> {
                                        return(
                                            <tr key={consulta.idConsulta}>
                                                <td>{consulta.idMedicoNavigation.nomeMedico}</td>
                                                <td>{consulta.idSituacaoNavigation.idSituacao}</td>
                                                <td>{Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric'
                                                }).format(new Date(consulta.dataConsulta))}</td>
                                                <td>{Intl.DateTimeFormat("pt-BR", { 
                                                    hour: 'numeric', minute: 'numeric', hour12: false
                                                    }).format(new Date(consulta.dataConsulta))}</td>
                                            </tr>
                                        )
                                    
                                      })
                                    }
                                </table>

                            </div>
    
                        </section>
    
                    </section>
                </main>
    
                <Footer></Footer>
    
            </div>
        )
    }
};
