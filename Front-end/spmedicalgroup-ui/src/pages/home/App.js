import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import logo from '../../assets/img/LOGO 2.png';
import fundo from '../../assets/img/fundo_MaisSobre.png';
import endereco from '../../assets/img/endereço.png';

import '../../assets/css/spmedicalgroup.css';
import Footer from '../../components/footer/Footer';

function App() {


  return (
      <div>

        <header className="fundo_headerHome">
          <div className="Home">
            <img className="logo_header" src={logo}>

              <nav className="nav_headerHome">
                <a> Home </a>
                <a> Especialidades </a>
                <a> Sobre a Clínica </a>
                <a> Endereço </a>
                <a className="login" href="login.html"> Login </a>
              </nav>
          </div>

            <div className="escrita_banner">
              <h1> Clínica SP Medical Group </h1>
              <p> sistema de saúde eficiente, de alta qualidade, focados em dedicar carinho e atenção aos seus pacientes.</p>
            </div>

        </header>

        <main>
          <section className="secao_especialidade">
            <div >
              <div className="especialidade">
                <h2> Especialidades </h2>
              </div>

              <div className="box_especialidade">
                <table className="tabela_Especialidade" id="tabela-lista">
                  <tr>
                    <td>Acupuntura</td>
                    <td>Anestesiologia</td>
                    <td>Cardiologia</td>
                    <td>Cirurgia Cardiovascular</td>
                  </tr>
                </table>

                <table className="tabela_Especialidade" id="tabela-lista">
                  <tr>
                    <td>Cirurgia da Mão</td>
                    <td>Cirurgia Geral</td>
                    <td>Cirurgia Pediátrica</td>
                    <td>Cirurgia Plástica</td>
                  </tr>
                </table>

                <table className="tabela_Especialidade" id="tabela-lista">
                  <tr>
                    <td>Cirurgia Torácica</td>
                    <td>Cirurgia Vascular</td>
                    <td>Dermatologia</td>
                    <td>Radioterapia</td>
                  </tr>
                </table>

                <table className="tabela_Especialidade" id="tabela-lista">
                  <tr>
                    <td>Urologia</td>
                    <td>Pediatria</td>
                    <td>Psiquiatria</td>
                    <td>Angiologia</td>
                  </tr>
                </table>

              </div>
            </div>
          </section>


          <section className="container_MaisSobre">
            <img src={fundo} />
            <div className="box_MaisSobre">
              <h3> Mais Sobre a Clínica </h3>
              <p> Lorem Ipsum sobreviveu não só a cinco séculos, como também permanecendo essencialmente
                inalterado. Se popularizou na década de 60, quando a
                Letraset passou a ser
                integrado a softwares de editoração eletrônica como Aldus
                PageMaker.</p>
            </div>
          </section>

          <section id="endereço" className="endereço">
            <h4> endereço:</h4>
            <div className="box_endereço">
              <p> Alameda Barão de Limeira, 539
                Santa Cecilia, São Paulo - SP
                CEP: 01202-001</p>
            </div>
            <img className="img_mapa" src={endereco}>
          </section>
            
        </main>

        <Footer></Footer>

      </div>

    );
}

export default App;