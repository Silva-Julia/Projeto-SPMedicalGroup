import { Component} from 'react';
import axios from "axios";

import Footer from '../../components/footer';
import HeaderMedico from '../../components/headerMedico';

import '../../assets/css/spmedicalgroup.css';
import perfilMulher from '../../assets/img/woman (1) 1.png';
import perfilHomem from '../../assets/img/man 1.png';
import perfilMulher2 from '../../assets/img/woman 1.png';
import perfilHomem2 from '../../assets/img/man (1) 1.png';

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
        axios('http://localhost:5000/api/Consultas/consulta', {
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
            fetch("http://localhost:5000/api/Consultas/Situacao/" + this.state.idConsultaAlterado, {
                method: 'PATCH',
                
                body: JSON.stringify({ idSituaçao: this.state.idSituaçao}),

                headers:{
                    'Content-Type' : 'Application/Json',
                    Authorization: 'Bearer' + localStorage.getItem('usuario-login'),
                }
            })

            .then((resposta) => {
                if(resposta.status === 204){
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

                    <section  class="area_fundoMedico">

                        <section class="cont_listaMedico">

                            <h2> Listar Consulta </h2>

                                <div class="conteudo_listaConsulta">
                                            <table  class="tabela_lista" id="tabela-lista">
                                            {this.state.listaConsultas.map((consulta) => {
                                                return (
                                                <tr>
                                                    <th><images src={perfilMulher}></images></th>
                                                    <td>Mariana  </td>
                                                    <td>Agendada</td>
                                                    <td>08/03/2020</td>
                                                    <td>15:00</td>
                                                </tr>
                                                 )
                                             })
                                             }
                                            </table>
                                                
                                            <table class="tabela_lista" id="tabela-lista">
                                                <tr>
                                                <th><images src={perfilHomem}></images></th>
                                                <td>João</td>
                                                <td>Cancelada</td>
                                                <td>30/01/2020</td>
                                                <td>9:00</td>                               
                                                </tr>
                                            </table>

                                            <table class="tabela_lista" id="tabela-lista">
                                                <tr>
                                                <th><images src={perfilMulher2}></images></th>
                                                <td>Mariana </td>
                                                <td>Realizada</td>
                                                <td>20/01/2020</td>
                                                <td>15:00</td>
                                                </tr>
                                            </table>

                                            <table class="tabela_lista" id="tabela-lista">
                                                <tr>
                                                <th><images src={perfilHomem2}></images></th>
                                                <td>Alexandre </td>
                                                <td>Agendada</td>
                                                <td>06/01/2020</td>
                                                <td> 10:00</td>
                                                </tr>
                                            </table>
                                         
                                </div>

                                {this.state.idConsultaAlterado !== 0 &&
                                    <div class="boton_alterarSitu">
                                        <form onSubmit={this.mudarSituacao}>
                                        <button class="btn__alterarSitu" id="btn__alterarSitu">
                                            Alterar Situação </button>
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