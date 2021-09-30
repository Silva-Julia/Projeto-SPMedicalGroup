using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using senai.spmedicalgroup.webApi.Domains;
using senai.spmedicalgroup.webApi.Interfaces;
using senai.spmedicalgroup.webApi.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spmedicalgroup.webApi.Controllers
{
    [Produces("application/json")]

    // Rota da API http://localhost:5000/api/medico

    [Route("api/[controller]")]
    [ApiController]
    public class MedicosController : ControllerBase
    {
        private IMedicoRepository _medicoRepository { get; set; }

        public MedicosController()
        {
            _medicoRepository = new MedicoRepository();
        }



        [HttpGet]
        public IActionResult Listar()
        {
            List<Medico> lista = _medicoRepository.ListarTodos();

            return Ok(lista);
        }



        [HttpPost]
        public IActionResult Cadastrar(Medico novoMedico)
        {
            try
            {
                if (novoMedico.Crm == null || novoMedico.IdEspecialidade <= 0 || novoMedico.IdClinica <= 0 || novoMedico.IdUsuario <= 0)
                {
                    return BadRequest(new
                    {
                        Mensagem = "Os dados são inválidos!"
                    });
                }

                _medicoRepository.Cadastrar(novoMedico);

                return Ok(new
                {
                    Mensagem = "Um novo médico foi cadastrado",
                    novoMedico
                });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

    }
}
