import { Component} from 'react';
import axios from "axios";

import Footer from '../../components/footer';
import HeaderPaginas from '../../components/headerPaginas';

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
        axios("http://localhost:5000/api/Consultas/consulta", {
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
                console.log()
            }
        )
    }



















    // render(){
    //     return(
    //         <div>
                
    //             <HeaderPaginas></HeaderPaginas>

    //              <main>

    //                 <section  class="area_fundoMedico">

    //                     <section class="cont_listaMedico">

    //                         <h2> Listar Consulta </h2>

    //                             <div class="conteudo_listaConsulta">
    //                                 <table  class="tabela_lista" id="tabela-lista">
    //                                     <tr>
    //                                         <th><img src="../spmedicalgroup-base/assets/woman (1) 1.png"></th>
    //                                         <td>Mariana  </td>
    //                                         <td>Agendada</td>
    //                                         <td>08/03/2020</td>
    //                                         <td>15:00</td>
    //                                     </tr>
    //                                 </table>
                                        
    //                                 <table class="tabela_lista" id="tabela-lista">
    //                                     <tr>
    //                                     <th><img src="../spmedicalgroup-base/assets/man 1.png"></th>
    //                                     <td>João</td>
    //                                     <td>Cancelada</td>
    //                                     <td>30/01/2020</td>
    //                                     <td>9:00</td>                               
    //                                     </tr>
    //                                 </table>

    //                                 <table class="tabela_lista" id="tabela-lista">
    //                                     <tr>
    //                                     <th><img src="../spmedicalgroup-base/assets/woman 1.png"></th>
    //                                     <td>Mariana </td>
    //                                     <td>Realizada</td>
    //                                     <td>20/01/2020</td>
    //                                     <td>15:00</td>
    //                                     </tr>
    //                                 </table>

    //                                 <table class="tabela_lista" id="tabela-lista">
    //                                     <tr>
    //                                     <th><img src="../spmedicalgroup-base/assets/man (1) 1.png"></th>
    //                                     <td>Alexandre </td>
    //                                     <td>Agendada</td>
    //                                     <td>06/01/2020</td>
    //                                     <td> 10:00</td>
    //                                     </tr>
    //                                 </table>
    //                             </div>

    //                             <div class="boton_alterarSitu">
    //                                 <button class="btn__alterarSitu" id="btn__alterarSitu" href="#">
    //                                     Alterar Situação
    //                                 </button>
    //                             </div>
    //                     </section>

    //                 </section>
    //              </main>

    //              <Footer></Footer>

    //         </div>
    //     )
    // }
}