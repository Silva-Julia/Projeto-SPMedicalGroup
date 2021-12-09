using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using senai.spmedicalgroup.webApi.Domains;
using senai.spmedicalgroup.webApi.Interfaces;
using senai.spmedicalgroup.webApi.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spmedicalgroup.webApi.Controllers
{
    [Produces("application/json")]

    // Rota da API http://localhost:5000/api/Consulta

    [Route("api/[controller]")]
    [ApiController]
    public class ConsultasController : ControllerBase
    {
        private IConsultaRepository _ConsultaRepository { get; set; }
        private IMedicoRepository _medicoRepository { get; set; }
        private IPacienteRepository _pacienteRepository { get; set; }



        public ConsultasController()
        {
            _ConsultaRepository = new ConsultaRepository();
            _medicoRepository = new MedicoRepository();
            _pacienteRepository = new PacienteRepository();
        }



        [Authorize(Roles = "Admin")]
        [HttpGet]
        public IActionResult ListarTodos()
        {
            try
            {
                List<Consultum> listaConsultas = _ConsultumRepository.ListarTodas();
                if (listaConsultas.Count == 0)
                {
                    return StatusCode(404, new
                    {
                        Mensagem = "Não há nenhuma Consulta cadastrada no sistema!"
                    });
                }
                return Ok(listaConsultas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }




        [Authorize(Roles = "Médico")]
        [HttpGet("Medico")]
        public IActionResult ConsultaMedico()
        {

            try
            {
                short idMedico = Convert.ToInt16(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                List<Consultum> listaConsulta = _ConsultaRepository.ListarConsultaMedico(idMedico);

                if (listaConsulta.Count == 0)
                {
                    return BadRequest(new
                    {
                        Mensagem = "Não há nenhuma Consulta do medico informado"
                    });
                }

                return Ok(listaConsulta);
            }
            catch (Exception erro)
            {

                return BadRequest(new
                {
                    mensagem = "Nao foi possivel ver suas Consultas",
                    erro
                });
            }

        }




        [Authorize(Roles = "2")]
        [HttpGet("Paciente")]
        public IActionResult ConsultaPaciente()
        {

            try
            {
                short idPaciente = Convert.ToInt16(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                Paciente pacienteBuscado = _pacienteRepository.BuscarPorId(idPaciente);

                List<Consultum> listaConsulta = _ConsultaRepository.ListarConsultaPaciente(pacienteBuscado.IdPaciente);

                if (listaConsulta.Count == 0)
                {

                    return BadRequest(new
                    {
                        Mensagem = "Não há nenhuma Consulta do paciente informado"
                    });
                }
                else
                {

                return Ok(listaConsulta);
                }
            }
            catch (Exception erro)
            {

                return BadRequest(new
                {
                    mensagem = "Nao foi possivel ver suas Consultas",
                    erro
                });
            }

        }



        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult Cadastrar(Consultum novaConsulta)
        {
            try
            {

                if (novaConsulta.IdMedico == null || novaConsulta.IdPaciente == null || novaConsulta.DataConsulta < DateTime.Now)
                {
                    return BadRequest(new
                    {
                        Mensagem = "Os dados informados são inválidos ou estão vazios!"
                    });
                }
                _ConsultaRepository.CadastrarConsulta(novaConsulta);

                return StatusCode(201, new
                {
                    Mensagem = "A Consulta foi cadastrada!",
                    novaConsulta
                });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }



        [Authorize(Roles = "Admin")]
        [HttpPatch("Cancelar/{id:int}")]
        public IActionResult Deletar(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest(new
                    {
                        Mensagem = "Informe um ID válido!"
                    });
                }

                if (_ConsultaRepository.BuscarPorId(id) == null)
                {
                    return BadRequest(new
                    {
                        Mensagem = "Não há nenhuma Consulta com o ID informado!"
                    });
                }
                _ConsultaRepository.CancelarConsulta(id);

                return StatusCode(204, new
                {
                    Mensagem = "A Consulta foi cancelada!"
                });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }



        [HttpGet("{id}")]
        public IActionResult BuscarPeloId(int id)
        {
            return Ok(_ConsultaRepository.BuscarPorId(id));
        }


        [Authorize(Roles = "Médico")]
        [HttpPatch("AlterarSituacao/{id}")]
        public IActionResult AlterarSituacao(Consultum ConsultaAtt, int id)
        {
            try
            {
                Consultum ConsultaBuscada = _ConsultaRepository.BuscarPorId(id);
                int idMedico = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);
                if (ConsultaAtt.DescricaoSituaConsulta == null)
                {
                    return BadRequest(new
                    {
                        Mensagem = "É necessário informar a situação!"
                    });
                }

                if (id <= 0)
                {
                    return BadRequest(new
                    {
                        Mensagem = "É necessário informar um ID válido!"
                    });
                }

                if (_ConsultaRepository.BuscarPorId(id) == null)
                {
                    return NotFound(new
                    {
                        Mensagem = "Não há nenhuma Consulta com o ID informado!"
                    });
                }

                if (ConsultaBuscada.IdMedico != idMedico)
                {
                    return BadRequest(new
                    {
                        Mensagem = "Somente o médico titular da Consulta pode fazer alterações na descrição!"
                    });
                }
                _ConsultaRepository.AlterarSituacao(ConsultaAtt.DescricaoSituaConsulta, id);
                return StatusCode(200, new
                {
                    Mensagem = "A situação da Consulta foi alterada com sucesso!",
                    ConsultaBuscada
                });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        [Authorize(Roles = "Admin")]
        [HttpDelete("Remover/{id:int}")]
        public IActionResult RemoverConsultaSistema(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest(new
                    {
                        Mensagem = "É necessário informar um ID válido!"
                    });
                }

                if (_ConsultaRepository.BuscarPorId(id) == null)
                {
                    return NotFound(new
                    {
                        Mensagem = "Não há nenhuma Consulta com o ID informado!"
                    });
                }

                _ConsultaRepository.RemoverConsultaSistema(id);

                return StatusCode(200, new
                {
                    Mensagem = "A Consulta informada foi removida do sistema!"
                });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
