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
    public class ClinicaRepository : IClinicaRepository
    {
        SpMedicalGroupWeb ctx = new SpMedicalGroupWeb();

        public void Atualizar(int id, Clinica attClinica)
        {
            Clinica clinicaBuscada = BuscarClinica(id);
            if (attClinica.Endereco != null || attClinica.Cnpj != null || attClinica.NomeClinica != null || attClinica.RazaoSocial != null)
            {
                clinicaBuscada.Endereco = attClinica.Endereco;
                clinicaBuscada.Cnpj = attClinica.Cnpj;
                clinicaBuscada.NomeClinica = attClinica.NomeClinica;
                clinicaBuscada.RazaoSocial = attClinica.RazaoSocial;

                ctx.Clinicas.Update(clinicaBuscada);

                ctx.SaveChanges();
            }
        }

        public Clinica BuscarClinica(int id)
        {
            return ctx.Clinicas.FirstOrDefault(c => c.IdClinica == id);
        }

        public void Cadastrar(Clinica novaClinica)
        {
            ctx.Clinicas.Add(novaClinica);

            ctx.SaveChanges();
        }

        public void Deletar(int idClinica)
        {
            ctx.Clinicas.Remove(BuscarClinica(idClinica));

            ctx.SaveChanges();
        }

        public List<Clinica> ListarTodas()
        {
            return ctx.Clinicas
                    .AsNoTracking()
                    .Select(c => new Clinica
                    {
                        NomeClinica = c.NomeClinica,
                        Cnpj = c.Cnpj,
                        Endereco = c.Endereco,
                        Medicos = ctx.Medicos.Where(m => m.IdClinica == c.IdClinica).ToList()
                    })
                    .ToList();

        }
    }
}
