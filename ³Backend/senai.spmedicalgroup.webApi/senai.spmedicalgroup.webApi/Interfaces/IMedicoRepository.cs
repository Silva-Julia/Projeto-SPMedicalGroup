using senai.spmedicalgroup.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spmedicalgroup.webApi.Interfaces
{
    interface IMedicoRepository
    {
        List<Medico> ListarTodos();

        void Cadastrar(Medico novoMedico);

        Medico BuscarPorID(int id);
    }
}
