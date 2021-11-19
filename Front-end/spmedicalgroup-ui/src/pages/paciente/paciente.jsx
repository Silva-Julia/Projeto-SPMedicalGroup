import { render } from "react-dom/cjs/react-dom.development";

import HeaderPaginas from '../../components/headerPaginas';
import Footer from '../../components/footer';


    render()
    {
        return(
            <div>
                <HeaderPaginas></HeaderPaginas>

                <main>
                    <section class="fundo_paciente">

                        <section class="cont_listaPaciente">

                            <h2> Listar Consulta </h2>
                            <div class="conteudo_listaConsulta">

                                <table class="tabela_lista" id="tabela-lista">
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
                                </table>
                            </div>

                        </section>

                    </section>
                </main>

                <Footer></Footer>

            </div>
        )
    }