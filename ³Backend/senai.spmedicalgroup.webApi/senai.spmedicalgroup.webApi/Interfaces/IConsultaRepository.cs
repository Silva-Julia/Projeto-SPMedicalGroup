using senai.spmedicalgroup.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spmedicalgroup.webApi.Interfaces
{
    interface IConsultaRepository
    {
        List<Consultum> ListarTodas();

        List<Consultum> ListarConsultaPaciente(int id);

        List<Consultum> ListarConsultaMedico(int id);

        void CadastrarConsulta(Consultum novaConsulta);

        void CancelarConsulta(int Id);

        void RemoverConsultaSistema(int id);

        void AlterarSituacao(string descriçao, int id);

        Consultum BuscarPorId(int id);
    }
}
