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

        public void AlterarSituacao(string descricao, int id)
        {
            Consulta consultaBuscado = BuscarPorId(id);
            if (descricao != null)
            {
                consultaBuscado.DescricaoSituaConsulta = descricao;

                ctx.Consulta.Update(consultaBuscado);

                ctx.SaveChanges();
            }
        }

        public Consulta BuscarPorId(int id)
        {
            return ctx.Consulta.FirstOrDefault(u => u.IdConsulta == id);
        }

        public void CadastrarConsulta(Consulta novaConsulta)
        {
            novaConsulta.DescricaoSituaConsulta = "";
            novaConsulta.IdSituacao = 2;

            ctx.Consulta.Add(novaConsulta);

            ctx.SaveChanges();
        }

        public void CancelarConsulta(int Id)
        {
            Consulta consultaBuscada = BuscarPorId(Id);

            consultaBuscada.DescricaoSituaConsulta = "Consulta Cancelada";
            consultaBuscada.IdSituacao = 3;

            ctx.Consulta.Update(consultaBuscada);
            ctx.SaveChanges();
        }

        public List<Consulta> ListarConsultaMedico(int id)
        {
            Medico medico = ctx.Medicos.FirstOrDefault(u => u.IdUsuario == id);

            short idMedico = medico.IdMedico;
            return ctx.Consulta
                //.Include(c => c.IdMedicoNavigation.IdUsuarioNavigation)               
                //.Where(c => c.IdMedicoNavigation.IdUsuarioNavigation.IdUsuario == id)
                .Where(c => c.IdMedico == idMedico)
                .AsNoTracking()
                .Select(p => new Consulta()
                {
                    DataConsulta = p.DataConsulta,
                    IdConsulta = p.IdConsulta,
                    DescricaoSituaConsulta = p.DescricaoSituaConsulta,
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

        public List<Consulta> ListarConsultaPaciente(int id)
        {
            Paciente paciente = ctx.Pacientes.FirstOrDefault(u => u.IdPaciente == id);

            int idPaciente = paciente.IdPaciente;
            return ctx.Consulta
                            .Where(c => c.IdPaciente == idPaciente)
                            .AsNoTracking()
                            .Select(p => new Consulta()
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

        public List<Consulta> ListarTodas()
        {
            return ctx.Consulta
                .Select(p => new Consulta()
                {   
                    IdConsulta = p.IdConsulta,
                    DescricaoSituaConsulta = p.DescricaoSituaConsulta,
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
