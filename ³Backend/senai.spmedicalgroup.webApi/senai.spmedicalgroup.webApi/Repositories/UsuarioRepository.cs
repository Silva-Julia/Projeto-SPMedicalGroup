using Microsoft.AspNetCore.Http;
using senai.spmedicalgroup.webApi.Context;
using senai.spmedicalgroup.webApi.Domains;
using senai.spmedicalgroup.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spmedicalgroup.webApi.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        SpMedicalGroupWeb ctx = new SpMedicalGroupWeb();

        public void Atualizar(int id, Usuario atualizarUsuario)
        {
            Usuario userBuscado = BuscarPorId(id);

            if (atualizarUsuario.NomeUsuario != null || atualizarUsuario.SenhaUsuario != null || atualizarUsuario.EmailUsuario != null)
            {
                userBuscado.NomeUsuario = atualizarUsuario.NomeUsuario;
                userBuscado.EmailUsuario = atualizarUsuario.EmailUsuario;
                userBuscado.SenhaUsuario = atualizarUsuario.SenhaUsuario;

                ctx.Usuarios.Update(userBuscado);

                ctx.SaveChanges();
            }
        }

        public Usuario BuscarPorId(int id)
        {
            return ctx.Usuarios.FirstOrDefault(u => u.IdUsuario == id);
        }

        public void Cadastrar(Usuario novoUser)
        {
            ctx.Usuarios.Add(novoUser);
            ctx.SaveChanges();
        }

        public string ConsultarPerfil(short id)
        {
            ImagemUsuario imagemBuscada = new ImagemUsuario();

            imagemBuscada = ctx.ImagemUsuarios.FirstOrDefault(i => i.IdUsuario == id);

            if (imagemBuscada != null)
            {
                return Convert.ToBase64String(imagemBuscada.Binario);
            }

            return null;
        }

        public void Deletar(int id)
        {
            ctx.Usuarios.Remove(BuscarPorId(id));
            ctx.SaveChanges();
        }

        public List<Usuario> ListarUsuarios()
        {
            return ctx.Usuarios
                .Select(u => new Usuario
                {
                    NomeUsuario = u.NomeUsuario,
                    EmailUsuario = u.EmailUsuario,
                    IdTipoUsuarioNavigation = new Tipousuario()
                    {
                        TituloTipoUsuario = u.IdTipoUsuarioNavigation.TituloTipoUsuario
                    }
                })
                .ToList();
        }

        public Usuario Login(string EmailUsuario, string SenhaUsuario)
        {
            return ctx.Usuarios.FirstOrDefault(e => e.EmailUsuario == EmailUsuario && e.SenhaUsuario == SenhaUsuario);
        }

        public void SalvarPerfil(IFormFile foto, short id)
        {
            ImagemUsuario novaImagem = new ImagemUsuario();

            using (var ms = new MemoryStream())
            {
                foto.CopyTo(ms);

                novaImagem.Binario = ms.ToArray();

                novaImagem.NomeArquivo = foto.FileName;
                novaImagem.MymeType = foto.FileName.Split('.').Last();
                novaImagem.IdUsuario = id;
            }

            ImagemUsuario imagemExistente = new ImagemUsuario();
            imagemExistente = ctx.ImagemUsuarios.FirstOrDefault(i => i.IdUsuario == id);

            if (imagemExistente != null)
            {
                imagemExistente.Binario = novaImagem.Binario;
                imagemExistente.NomeArquivo = novaImagem.NomeArquivo;
                imagemExistente.MymeType = novaImagem.MymeType;
                imagemExistente.IdUsuario = id;

                ctx.ImagemUsuarios.Update(imagemExistente);
            }
            else
            {
                ctx.ImagemUsuarios.Add(novaImagem);
            }

            ctx.SaveChanges();
        }
    }
}
