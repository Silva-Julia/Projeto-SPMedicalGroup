import { Component} from 'react';
import axios from "axios";

import Footer from '../../components/footer';
import HeaderMedico from '../../components/headerMedico';

import '../../assets/css/spmedicalgroup.css';

export default class Medico extends Component{
    constructor(props){
        super(props);
        this.state = {
            listaConsultas: [],
            nomePaciente: '',
            idConsulta: '',
            dataConsulta: '',
            idSituaçao:'',
            erro: '',
            idConsultaAlterado: 0,
            isLoading: false,
            editando: false,
            keyAtual: 0
        }
    };

    buscaConsultas =() => {
        axios('http://localhost:5000/api/Consulta/Medico', {
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('usuario-login')
            },
        })
            .then((resposta => resposta.json())
        
            .then((dados) => this.setState ({ listaConsultas: dados}))

            .catch(erro => console.log(erro))
    )}
    componentDidMount(){
        this.buscaConsultas();
    }

    mudarSituacao = (event) => {
        event.preventDefault();
        console.log(this.state.idConsultaAlterado)
        console.log(this.state.idSituaçao)

        if(this.state.idConsultaAlterado !== 0) {
            fetch("http://localhost:5000/api/Consulta/AlterarSituacao/" + this.state.idConsultaAlterado, {
                method: 'PATCH',
                
                body: JSON.stringify({ idSituaçao: this.state.idSituaçao}),

                headers:{
                    'Content-Type' : 'Application/Json',
                    Authorization: 'Bearer' + localStorage.getItem('usuario-login'),
                }
            })

            .then((resposta) => {
                if(resposta.status === 200){
                    console.log(
                        this.state.idConsultaAlterado + 'foi atualizado',
                    );
                }
            })

            .catch((erro) => console.log(erro))
            .then(this.buscaConsultas)
            .then(this.limpaCampos)
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




    render(){
        return(
            <div>
                
                <HeaderMedico></HeaderMedico>

                 <main>

                    <section  className="area_fundoMedico">

                        <section className="cont_listaMedico">

                            <h2> Listar Consulta </h2>

                                <div className="conteudo_listaConsulta">
                                            <table  className="tabela_lista" id="tabela-lista">
                                            {this.state.listaConsultas.map((consulta) => {
                                                return (
                                                    <tr key={consulta.idConsulta}>
                                                    <td>{consulta.idPacienteNavigation.nomePaciente}</td>
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

                                {this.state.idConsultaAlterado !== 0 &&
                                    <div className="boton_alterarSitu">
                                        <form onSubmit={this.mudarSituacao}>
                                            <label className="btn__alterarSitu" id="btn__alterarSitu"> Alterar Situação </label>
                                            <input type="text" value={this.state.idSituaçao} onChange={this.atualizaStateCampo} />
                                            <button type="submit"> Salvar </button>
                                            <button type="button" onClick={this.limparCampos}>Cancelar</button>
                                            </form>
                                    </div>
                                }
                        </section>

                    </section>
                 </main>

                 <Footer></Footer>

            </div>
        )
    }
}