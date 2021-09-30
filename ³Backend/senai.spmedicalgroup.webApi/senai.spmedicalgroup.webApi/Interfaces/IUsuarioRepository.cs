using Microsoft.AspNetCore.Http;
using senai.spmedicalgroup.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spmedicalgroup.webApi.Interfaces
{
    interface IUsuarioRepository
    {
        List<Usuario> ListarUsuarios();
        void Cadastrar(Usuario novoUser);
        Usuario Login(string email, string senha);
        void SalvarPerfil(IFormFile foto, short id);
        string ConsultarPerfil(short id);
        void Atualizar(int id, Usuario atualizarUsuario);
        Usuario BuscarPorId(int id);
        void Deletar(int id);
    }
}
