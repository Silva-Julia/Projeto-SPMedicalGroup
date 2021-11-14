using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using senai.spmedicalgroup.webApi.Domains;
using senai.spmedicalgroup.webApi.Repositories;
using senai.spmedicalgroup.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spmedicalgroup.webApi.Controllers
{

    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class PacienteController : ControllerBase
    {
        private IPacienteRepository _pacienteRepository { get; set; }
        private PacienteController()
        {
            _pacienteRepository = new PacienteRepository();
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                List<Paciente> lista = _pacienteRepository.ListarTodos();

                if (lista == null)
                {
                    return BadRequest(new
                    {
                        Mensagem = "Não há nenhum paciente cadastrado no sistema"
                    });
                }

                return Ok(lista);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult Cadastrar(Paciente novoPaciente)
        {
            try
            {
                if (novoPaciente.NomePaciente != null ||  novoPaciente.Cpf == null || novoPaciente.DataNascimento > DateTime.Now || novoPaciente.EnderecoPaciente == null || novoPaciente.IdUsuario == null)
                {
                    return BadRequest(new
                    {
                        Mensagem = "Os dados estão inválidos!"
                    });
                }

                _pacienteRepository.Cadastrar(novoPaciente);

                return Ok(new
                {
                    Mensagem = "O Paciente foi cadastrado com sucesso!",
                    novoPaciente
                });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id:int}")]
        public IActionResult Atualizar(int id, Paciente attPaciente)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest(new
                    {
                        Mensagem = "Insira um ID válido!"
                    });
                }

                if (_pacienteRepository.BuscarPorId(id) == null)
                {
                    return NotFound(new
                    {
                        Mensagem = "Não há nenhum paciente com o ID informado!"
                    });
                }

                if (attPaciente.NomePaciente != null || attPaciente.Cpf == null || attPaciente.DataNascimento > DateTime.Now ||  attPaciente.EnderecoPaciente == null || attPaciente.IdUsuario == null)
                {
                    return BadRequest(new
                    {
                        Mensagem = "Os dados informados são inválidos!"
                    });
                }

                _pacienteRepository.Atualizar(id, attPaciente);
                return Ok(new
                {
                    Mensagem = "O Paciente foi atualizado com sucesso!",
                    attPaciente
                });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public IActionResult Deletar(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new
                {
                    Mensagem = "Insira um ID válido!"
                });
            }

            if (_pacienteRepository.BuscarPorId(id) == null)
            {
                return NotFound(new
                {
                    Mensagem = "Não há nenhum paciente com o ID informado!"
                });
            }

            _pacienteRepository.Deletar(id);
            return Ok(new
            {
                Mensagem = "O Paciente foi deletado com sucesso!",

            });
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{id:int}")]
        public IActionResult BuscarPorId(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new
                {
                    Mensagem = "Insira um ID válido!"
                });
            }

            if (_pacienteRepository.BuscarPorId(id) == null)
            {
                return NotFound(new
                {
                    Mensagem = "Não há nenhum paciente com o ID informado!"
                });
            }

            Paciente pacienteEncontrado = _pacienteRepository.BuscarPorId(id);
            return Ok(new
            {
                Mensagem = "O Paciente foi encontrado com sucesso!",
                pacienteEncontrado
            });
        }
    }
}
