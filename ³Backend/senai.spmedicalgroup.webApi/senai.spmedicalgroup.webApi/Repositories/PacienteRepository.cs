using Microsoft.EntityFrameworkCore;
using senai.spmedicalgroup.webApi.Domains;
using senai.spmedicalgroup.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spmedicalgroup.webApi.Repositories
{
    public class PacienteRepository : IPacienteRepository
    {
        SpMedicalGroupContext ctx = new SpMedicalGroupContext();

        public void Atualizar(int id, Paciente attPaciente)
        {
            Paciente pacienteBuscado = BuscarPorId(id);

            if (attPaciente.NomePaciente != null || attPaciente.Cpf != null || attPaciente.EnderecoPaciente != null || attPaciente.DataNascimento < DateTime.Now)
            {
                pacienteBuscado.NomePaciente = pacienteBuscado.NomePaciente;
                pacienteBuscado.IdUsuario = pacienteBuscado.IdUsuario;
                pacienteBuscado.Cpf = pacienteBuscado.Cpf;
                pacienteBuscado.EnderecoPaciente = attPaciente.EnderecoPaciente;
                pacienteBuscado.DataNascimento = attPaciente.DataNascimento;

                ctx.Pacientes.Update(pacienteBuscado);

                ctx.SaveChanges();
            }
        }

        public Paciente BuscarPorId(int id)
        {
            return ctx.Pacientes.FirstOrDefault(p => p.IdPaciente == id);
        }

        public void Cadastrar(Paciente novoPaciente)
        {
            ctx.Pacientes.Add(novoPaciente);

            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            ctx.Pacientes.Remove(BuscarPorId(id));

            ctx.SaveChanges();
        }

        public List<Paciente> ListarTodos()
        {
            return ctx.Pacientes
                        .AsNoTracking()
                        .Select(p => new Paciente()
                        {
                            IdPaciente = p.IdPaciente,
                            EnderecoPaciente = p.EnderecoPaciente,
                            DataNasc = p.DataNasc,
                            
                            IdUsuarioNavigation = new Usuario()
                            {
                                NomeUsuario = p.IdUsuarioNavigation.NomeUsuario,
                                EmailUsuario = p.IdUsuarioNavigation.EmailUsuario,
                            }
                        })
                        .ToList();
        }
    }
}
