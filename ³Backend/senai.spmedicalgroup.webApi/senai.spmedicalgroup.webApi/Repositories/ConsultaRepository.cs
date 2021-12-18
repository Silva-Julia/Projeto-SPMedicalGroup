using Microsoft.EntityFrameworkCore;
using senai.spmedicalgroup.webApi.Contexts;
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

        public void AlterarSituacao(string descricao, int id)
        {
            Consultum consultaBuscado = BuscarPorId(id);
            if (descricao != null)
            {
                consultaBuscado.SituacaoConsulta = descricao;

                ctx.Consulta.Update(consultaBuscado);

                ctx.SaveChanges();
            }
        }

        public Consultum BuscarPorId(int id)
        {
            return ctx.Consulta.FirstOrDefault(u => u.IdConsulta == id);
        }

        public void CadastrarConsulta(Consultum novaConsulta)
        {      

            ctx.Consulta.Add(novaConsulta);

            ctx.SaveChanges();
        }

        public void CancelarConsulta(int Id)
        {
            Consultum consultaBuscada = BuscarPorId(Id);

            consultaBuscada.IdSituacao = 3;
            consultaBuscada.SituacaoConsulta = "Consulta Cancelada!";
            ctx.Consulta.Update(consultaBuscada);
            ctx.SaveChanges();
        }

        public List<Consultum> ListarConsultaMedico(int id)
        {
            Medico medico = ctx.Medicos.FirstOrDefault(u => u.IdUsuario == id);

            short idMedico = medico.IdMedico;
            return ctx.Consulta
                //.Include(c => c.IdMedicoNavigation.IdUsuarioNavigation)               
                //.Where(c => c.IdMedicoNavigation.IdUsuarioNavigation.IdUsuario == id)
                .Where(c => c.IdMedico == idMedico)
                .AsNoTracking()
                .Select(p => new Consultum()
                {
                    DataConsulta = p.DataConsulta,
                    IdConsulta = p.IdConsulta,
                    IdSituacao = p.IdSituacao,
                    IdMedicoNavigation = new Medico()
                    {
                        Crm = p.IdMedicoNavigation.Crm,
                        IdUsuarioNavigation = new Usuario()
                        {
                            NomeUsuario = p.IdMedicoNavigation.IdUsuarioNavigation.NomeUsuario,
                            EmailUsuario = p.IdMedicoNavigation.IdUsuarioNavigation.EmailUsuario
                        },
                        IdClinicaNavigation = new Clinica()
                        {
                            NomeClinica = p.IdMedicoNavigation.IdClinicaNavigation.NomeClinica
                        }
                    },
                    IdPacienteNavigation = new Paciente()
                    {
                        Cpf = p.IdPacienteNavigation.Cpf,
                        IdUsuarioNavigation = new Usuario()
                        {
                            NomeUsuario = p.IdPacienteNavigation.IdUsuarioNavigation.NomeUsuario,
                            EmailUsuario = p.IdPacienteNavigation.IdUsuarioNavigation.EmailUsuario
                        }
                    },
                    IdSituacaoNavigation = new Situacao()
                    {
                        DescricaoSituacao = p.IdSituacaoNavigation.DescricaoSituacao
                    }


                })
                .ToList();
        }

        public List<Consultum> ListarConsultaPaciente(int id)
        {
            Paciente paciente = ctx.Pacientes.FirstOrDefault(u => u.IdPaciente == id);

            int idPaciente = paciente.IdPaciente;
            return ctx.Consulta
                            .Where(c => c.IdPaciente == idPaciente)
                            .AsNoTracking()
                            .Select(p => new Consultum()
                            {
                                DataConsulta = p.DataConsulta,
                                IdConsulta = p.IdConsulta,
                                IdMedicoNavigation = new Medico()
                                {
                                    Crm = p.IdMedicoNavigation.Crm,
                                    IdUsuarioNavigation = new Usuario()
                                    {
                                        NomeUsuario = p.IdMedicoNavigation.IdUsuarioNavigation.NomeUsuario,
                                        EmailUsuario = p.IdMedicoNavigation.IdUsuarioNavigation.EmailUsuario,

                                    },
                                    IdClinicaNavigation = new Clinica()
                                    {
                                        NomeClinica = p.IdMedicoNavigation.IdClinicaNavigation.NomeClinica
                                    }
                                },
                                IdPacienteNavigation = new Paciente()
                                {
                                    Cpf = p.IdPacienteNavigation.Cpf,
                                    IdUsuarioNavigation = new Usuario()
                                    {
                                        NomeUsuario = p.IdPacienteNavigation.IdUsuarioNavigation.NomeUsuario,
                                        EmailUsuario = p.IdPacienteNavigation.IdUsuarioNavigation.EmailUsuario
                                    }
                                },
                                IdSituacaoNavigation = new Situacao()
                                {
                                    DescricaoSituacao = p.IdSituacaoNavigation.DescricaoSituacao
                                }

                            })
                            .ToList();
        }

        public List<Consultum> ListarTodas()
        {
            return ctx.Consulta
                .Select(p => new Consultum()
                {   
                    IdConsulta = p.IdConsulta,
                    IdSituacao = p.IdSituacao,
                    DataConsulta = p.DataConsulta,

                    IdMedicoNavigation = new Medico()
                    {
                        Crm = p.IdMedicoNavigation.Crm,
                        IdUsuarioNavigation = new Usuario()
                        {
                            NomeUsuario = p.IdMedicoNavigation.IdUsuarioNavigation.NomeUsuario,
                            EmailUsuario = p.IdMedicoNavigation.IdUsuarioNavigation.EmailUsuario
                        },
                        IdClinicaNavigation = new Clinica()
                        {
                            NomeClinica = p.IdMedicoNavigation.IdClinicaNavigation.NomeClinica
                        }
                    },
                    IdPacienteNavigation = new Paciente()
                    {                        
                        Cpf = p.IdPacienteNavigation.Cpf,
                        DataNascimento = p.IdPacienteNavigation.DataNascimento,
                        EnderecoPaciente = p.IdPacienteNavigation.EnderecoPaciente,
                        IdUsuarioNavigation = new Usuario()
                        {
                            NomeUsuario = p.IdPacienteNavigation.IdUsuarioNavigation.NomeUsuario,
                            EmailUsuario = p.IdPacienteNavigation.IdUsuarioNavigation.EmailUsuario
                        }
                    },
                    IdSituacaoNavigation = new Situacao()
                    {
                        DescricaoSituacao = p.IdSituacaoNavigation.DescricaoSituacao
                    }
                })
                .ToList();
        }

        public void RemoverConsultaSistema(int id)
        {
            ctx.Consulta.Remove(BuscarPorId(id));
            ctx.SaveChanges();
        }

        
    }
}
