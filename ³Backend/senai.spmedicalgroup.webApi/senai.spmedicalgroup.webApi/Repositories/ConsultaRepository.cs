using Microsoft.EntityFrameworkCore;
using senai.spmedicalgroup.webApi.Context;
using senai.spmedicalgroup.webApi.Domains;
using senai.spmedicalgroup.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spmedicalgroup.webApi.Repositories
{
    public class ConsultaRepository : IConsultaRepository
    {
        SpMedicalGroupWeb ctx = new SpMedicalGroupWeb();

        public Consulta BuscarPorId(int id)
        {
            return ctx.Consulta.FirstOrDefault(u => u.IdConsulta == id);
        }

        public void CadastrarConsulta(Consulta novaConsulta)
        {
            
            novaConsulta.IdSituacao = 2;

            ctx.Consulta.Add(novaConsulta);

            ctx.SaveChanges();
        }

        public void CancelarConsulta(int Id)
        {
            Consulta consultaBuscada = BuscarPorId(Id);
            consultaBuscada.IdSituacao = 3;

            ctx.Consulta.Update(consultaBuscada);
            ctx.SaveChanges();
        }

        public List<Consulta> ListarConsultaMedico(int id)
        {
            return ctx.Consulta
                .Include(c => c.IdMedicoNavigation.IdUsuarioNavigation)               
                .Where(c => c.IdMedicoNavigation.IdUsuarioNavigation.IdUsuario == id)
                .ToList();
        }

        public List<Consulta> ListarConsultaPaciente(int id)
        {
            return ctx.Consulta
                .Include(c => c.IdPacienteNavigation.IdUsuarioNavigation)
                .Where(c => c.IdPacienteNavigation.IdUsuarioNavigation.IdUsuario == id)
                .ToList();
        }

        public List<Consulta> ListarTodas()
        {
            return ctx.Consulta
                .Select(p => new Consulta()
                {
                    IdPaciente = p.IdPaciente,
                    IdMedico = p.IdMedico,
                    IdConsulta = p.IdConsulta,
                    IdSituacao = p.IdSituacao,
                    DataConsulta = p.DataConsulta,

                    IdMedicoNavigation = new Medico()
                    {
                        Crm = p.IdMedicoNavigation.Crm,
                        NomeMedico = p.IdMedicoNavigation.NomeMedico,
                        IdEspecialidadeNavigation = new Especialidade()
                        {
                            DescricaoEspecialidade = p.IdMedicoNavigation.IdEspecialidadeNavigation.DescricaoEspecialidade,

                        }
                    },
                    IdPacienteNavigation = new Paciente()
                    {
                        NomePaciente = p.IdPacienteNavigation.NomePaciente,                        
                        Cpf = p.IdPacienteNavigation.Cpf,
                        DataNascimento = p.IdPacienteNavigation.DataNascimento,
                        EnderecoPaciente = p.IdPacienteNavigation.EnderecoPaciente,
                        IdUsuarioNavigation = new Usuario()
                        {
                            NomeUsuario = p.IdPacienteNavigation.IdUsuarioNavigation.NomeUsuario,
                            EmailUsuario = p.IdPacienteNavigation.IdUsuarioNavigation.EmailUsuario
                        }
                    },
                    
               })
                .ToList();
        }
    }
}
