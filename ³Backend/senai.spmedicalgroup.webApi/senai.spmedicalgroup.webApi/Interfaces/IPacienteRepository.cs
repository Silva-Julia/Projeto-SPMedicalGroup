using senai.spmedicalgroup.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spmedicalgroup.webApi.Interfaces
{
    interface IPacienteRepository
    {
        List<Paciente> ListarTodos();
        void Cadastrar(Paciente novoPaciente);
        void Deletar(int id);
        void Atualizar(int id, Paciente attPaciente);
        Paciente BuscarPorId(int id);
    }
}
