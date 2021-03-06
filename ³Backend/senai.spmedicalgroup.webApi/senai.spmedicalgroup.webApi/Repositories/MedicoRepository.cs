using senai.spmedicalgroup.webApi.Contexts;
using senai.spmedicalgroup.webApi.Domains;
using senai.spmedicalgroup.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spmedicalgroup.webApi.Repositories
{
    public class MedicoRepository : IMedicoRepository
    {
        SpMedicalGroupWeb ctx = new SpMedicalGroupWeb();

        public Medico BuscarPorID(int id)
        {
            return ctx.Medicos.FirstOrDefault(m => m.IdUsuario == id);
        }

        public void Cadastrar(Medico novoMedico)
        {
            ctx.Medicos.Add(novoMedico);

            ctx.SaveChanges();
        }

        public List<Medico> ListarTodos()
        {
            return ctx.Medicos.Select(u => new Medico()
            {
                IdUsuario = u.IdUsuario,
                IdMedico = u.IdMedico,
                IdUsuarioNavigation = new Usuario()
                {
                    NomeUsuario = u.IdUsuarioNavigation.NomeUsuario
                }
            }).ToList();
        }
    }
}
