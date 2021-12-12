import { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { parseJwt } from "../../services/auth.js";

import '../../assets/css/spmedicalgroup.css';
import logo from '../../assets/img/LOGO.png';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'João@email.com',
      senha: '1234',
      erroMensagem: '',
      isLoading: false,
    };
  }


  // Função que faz a chamada para a API para realiza o login
  efetuaLogin = (event) => {
    // ignora o comportamento padrão do navegador (recarregar a página, por exemplo)
    event.preventDefault();

    this.setState({ erroMensagem: '', isLoading: true });

    // Define a url e o corpo da requisição
    axios.post('http://localhost:5000/api/ogin', {
        email: this.state.email,
        senha: this.state.senha,
      })


      // recebe todo o conteúdo da resposta da requisição na variável resposta
      .then((resposta) => {
        // verifico se o status code dessa resposta é igual a 200
        if (resposta.status === 200) {
          // se sim, exibe no console do navegador o token do usuário logado,
          // console.log('Meu token é: ' + resposta.data.token);
          // salva o valor do token no localStorage
          localStorage.setItem('usuario-login', resposta.data.token);

          // e define que a requisição terminou
          this.setState({ isLoading: false });

          // define a variável base64 que vai receber o payload do token
          let base64 = localStorage.getItem('usuario-login').split('.')[1];

          // exibe no console do navegador o valor em base64
          console.log(base64);

          console.log(this.props);

          // verifica se o usuário logado é do tipo administrador
          switch (parseJwt().role) {
            case "1":
              this.props.history.push('Admin')
              break;
            case "2":
              this.props.history.push('ConsultaPaciente')
              break;
            case "3":
              this.props.history.push('ConsultaMedico')
              break;

            default:
              break;
            }
        }
      })

      // Caso haja um erro,
      .catch(() => {
        // define o valor do state erroMensagem com uma mensagem personalizada
        this.setState({
          erroMensagem: 'E-mail e/ou senha inválidos! Tente novamente',
          isLoading: false,
        });
      });
  };


  atualizaStateCampo = (campo) => {
    // quando estiver digitando no campo username
    //                     email        :       adm@adm.com

    // quando estiver digitando no campo password
    //                     senha        :        senha123
    this.setState({ [campo.target.name]: campo.target.value });
  };


  render()
  {
    return(
      <div>
        <section className="container">

          <Link to="/"><img className="logo" to="/App.js" src={logo} alt="LOGO" /> </Link>

          <form className="box_login" onSubmit={this.efetuaLogin}>
            <div className="linha_escrita_login">
              <input
                className="input__login"
                placeholder="Username"
                type="text"
                name="Username"

                // define que o input email recebe o valor do state email
                value={this.state.email}
                // faz a chamada para a função que atualiza o state, conforme o usuário altera o valor do input
                onChange={this.atualizaStateCampo}
              />
            </div>

            <div className="linha_escrita_login">
              <input
                className="input__login"
                placeholder="Senha"
                type="password"
                name="Senha"

                // define que o input senha recebe o valor do state senha
                value={this.state.senha}
                // faz a chamada para a função que atualiza o state, conforme o usuário altera o valor do input
                onChange={this.atualizaStateCampo}
              />
            </div>

            {/* Exibe a mensagem de erro ao tentar logar com credenciais inválidas */}
            <p style={{ color: 'red', textAlign: 'center' }}>{this.state.erroMensagem}</p>


            { /*   Verifica se a requisição está em andamento  Se estiver, desabilita o click do botão  */}
            { // Caso seja true, renderiza o botão desabilitado com o texto 'Loading...' */}
              this.state.isLoading === true && (
                <div className="boton_Login">
                  <button type="submit" className="btn__login" disabled> Loading...</button>
                </div>
              )
            }

            { // Caso seja false, renderiza o botão habilitado com o texto 'Login'
              this.state.isLoading === false && (
                <div className="boton_Login">
                  <button type="submit" className="btn__login" id="btn__login"
                      disabled={this.state.email === '' || this.state.senha === '' ? 'none' : ''}
                  >Login
                  </button>
                </div>
              )
            }


            <div className="local_esqueceuSenha">
              <hr className="hr_pequeno"></hr>
              <nav>
                <button className="esqueceuSenha" > Esqueceu a senha </button>
              </nav>
            </div>
          </form>

          <div className="box_login2">
            <span className="link"> Não tem uma conta? <a className="link_cadastro" href="cadastro.html"> Cadastre-se </a> </span>
          </div>
          </section>
      </div>
    );
  }
}