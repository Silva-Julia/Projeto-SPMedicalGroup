import { render } from "react-dom/cjs/react-dom.development";
import { Component } from "react";

import HeaderPaciente from '../../components/headerPaciente';
import Footer from '../../components/footer';

export default class Paciente extends Component{

    constructor(props){
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
        fetch('http://localhost:5000/api/Consultas/consulta',{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            }
        })

        .then((resposta) => resposta.json())
        .then((dados) => this.setState({ listaConsultas: dados}))
        .catch((erro) => console.log(erro))
    }

    componentDidMount(){
        this.buscarConsultas();
    }




    render()
    {
        return(
            <div>
                <HeaderPaciente></HeaderPaciente>
    
                <main>
                    <section class="fundo_paciente">
    
                        <section class="cont_listaPaciente">
    
                            <h2> Listar Consulta </h2>
                            <div class="conteudo_listaConsulta">
                             
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

                                {/* <table class="tabela_lista" id="tabela-lista">
                                    <tr>
                                        <td>Dr. Ricardo Lemos</td>
                                        <td>Cancelada  </td>
                                        <td> 07/02/2019</td>
                                        <td>11:00</td>
                                    </tr>
                                </table>
    
                                <table class="tabela_lista" id="tabela-lista">
                                    <tr>
                                        <td> Dr. Ricardo Lemos </td>
                                        <td>Agendada</td>
                                        <td>09/03/2020</td>
                                        <td>11:00</td>
                                    </tr>
                                </table>
    
                                <table class="tabela_lista" id="tabela-lista">
                                    <tr>
                                        <td>Dra. Helena Strada</td>
                                        <td>Realizada </td>
                                        <td>30/02/2020</td>
                                        <td>10:00</td>
                                    </tr>
                                </table> */}
                            </div>
    
                        </section>
    
                    </section>
                </main>
    
                <Footer></Footer>
    
            </div>
        )
    }
}
