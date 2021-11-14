using senai.spmedicalgroup.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spmedicalgroup.webApi.Interfaces
{
    interface IConsultaRepository
    {
        List<Consulta> ListarTodas();

        List<Consulta> ListarConsultaPaciente(int id);

        List<Consulta> ListarConsultaMedico(int id);

        void CadastrarConsulta(Consulta novaConsulta);

        void CancelarConsulta(int Id);

        void RemoverConsultaSistema(int id);

        void AlterarSituacao(string descricao, int id);

        Consulta BuscarPorId(int id);
    }
}
