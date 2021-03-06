import { Component } from 'react';
import axios from "axios";
//import { parseJwt, usuarioAutenticado } from '../../services/auth';

import Footer from '../../components/footer';
import HeaderMedico from '../../components/headerMedico';
import BotaoEdit from '../../assets/img/botao-editar.png';
import '../../assets/css/spmedicalgroup.css';
//import { render } from 'react-dom';

export default class Medico extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaConsultas: [],
            nomePaciente: '',
            idConsulta: '',
            dataConsulta: '',
            idSituaçao: '',
            erro: '',
            idConsultaAlterado: 0,
            isLoading: false,
            editando: false,
            keyAtual: 0,
        }
    };

    buscarConsultas = () => {
        axios('http://localhost:5000/api/Consultas/Medico', {
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

    
    mudarSituacao = (event) => {
        //event.preventDefault();
        console.log(this.state.idConsultaAlterado)
        console.log(this.state.idSituaçao)

        if (this.state.idConsultaAlterado !== 0) {
            fetch("http://localhost:5000/api/Consulta/AlterarSituacao" + this.state.idConsultaAlterado, {
                method: 'PATCH',

                body: JSON.stringify({ idSituaçao: this.state.idSituaçao }),

                headers: {
                    'Content-Type': 'Application/Json',
                    Authorization: 'Bearer' + localStorage.getItem('usuario-login'),
                }
            })

                .then((resposta) => {
                    if (resposta.status === 200) {
                        console.log(
                            this.state.idConsultaAlterado + 'foi atualizado',
                        );
                    }
                })

                .catch((erro) => console.log(erro))
                // .then(this.buscaConsultas)
                // .then(this.limpaCampos)
        }
    }

    buscaConsulta = (consultaRecebida) => {
        console.log(consultaRecebida)
        this.setState(
            {
                idConsultaAlterado: consultaRecebida.idConsulta,
                idSituaçao: consultaRecebida.idSituaçao,
            },
            () => {
                console.log(
                    'A' + consultaRecebida.idConsulta + ' foi selecionada,',
                    'agora o valor é: ' + this.state.idConsultaAlterado,
                    'e o valor da situação é: ' + this.state.idSituaçao,
                )
            }
        )
    }

    atualizaStateCampo = async (event) => {
        await this.setState({
            //diz o target (alvo) do evento , pegando o value(valor)
            idSituaçao: event.target.value,
        });
        console.log(this.state.idSituaçao);
    };
    
    limparCampos = () => {
        this.setState({
            idSituaçao: '',
            idConsultaAlterado: 0,
        });
        console.log('Os states foram resetados!');
    };
    

    componentDidMount() {
        this.buscarConsultas();
    }



    render() {
        return (
            <div>

                <HeaderMedico></HeaderMedico>

                <main>

                    <section className="area_fundoMedico">

                        <section className="cont_listaMedico">

                            <h2> Listar Consulta </h2>

                                        {this.state.listaConsultas.map((consulta) => {
                                            return (
                                                <div className="conteudo_listaConsulta">
                                                    <table className="tabela_lista" id="tabela-lista">

                                                        <tbody>
                                                            <tr key={consulta.idConsulta}>
                                                                <td>{consulta.idPacienteNavigation.idUsuarioNavigation.nomeUsuario}</td>
                                                                <td>{consulta.idSituacaoNavigation.descricaoSituacao }</td>
                                                                {/* {this.state.editando == true && this.state.idConsulta == consulta.idConsulta ? 
                                                                        <td> <input type="text" value={this.state.idSituaçao} onChange={this.atualizaStateCampo} placeholder='Situação'/> </td> : <td>{consulta.idSituacaoNavigation.descricaoSituacao }</td> }
                                                                        {usuarioAutenticado() && parseJwt().role === '2' ? this.state.editando == true && this.state.idConsulta === consulta.idSituacaoNavigation.descricaoSituacao ? <td><button onClick={()=> this.mudarSituacao()}>Salvar</button></td> :  <button onClick={() => this.buscaConsulta(consulta)}><img src={BotaoEdit} style={{ width: 28 }} alt="Botao Editar" /></button> : null} */}
                                                                    
                                                                <img src={BotaoEdit} style={{ width: 28 }} alt="Botao Editar" />

                                                                <td>{Intl.DateTimeFormat("pt-BR", {
                                                                    year: 'numeric', month: 'numeric', day: 'numeric'
                                                                }).format(new Date(consulta.dataConsulta))}</td>
                                                                <td>{Intl.DateTimeFormat("pt-BR", {
                                                                    hour: 'numeric', minute: 'numeric', hour12: false
                                                                }).format(new Date(consulta.dataConsulta))}</td>

                                                                
                                                            </tr>
                                                        </tbody>

                                                    </table>

                                                </div>
                                            )
                                        })
                                        }
                            
                            {/* <div className="boton_alterarSitu">
                                <form onSubmit={this.mudarSituacao}>
                                    <button className="btn__alterarSitu" id="btn__alterarSitu"> Alterar Situação </button>

                                    <input type="text" value={this.state.idSituaçao} onChange={this.atualizaStateCampo} />
                                    <button type="submit"> Salvar </button>
                                    <button type="button" onClick={this.limparCampos}>Cancelar</button>
                                </form>
                            </div> */}

                        </section>

                    </section>
                </main>

                <Footer></Footer>

            </div>
        )
    }
}