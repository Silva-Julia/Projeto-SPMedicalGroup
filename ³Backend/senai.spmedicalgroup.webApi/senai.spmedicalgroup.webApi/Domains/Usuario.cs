using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace senai.spmedicalgroup.webApi.Domains
{
    public partial class Usuario
    {
        public Usuario()
        {
            ImagemUsuarios = new HashSet<ImagemUsuario>();
            Medicos = new HashSet<Medico>();
            Pacientes = new HashSet<Paciente>();
        }

        public short IdUsuario { get; set; }
        public byte? IdTipoUsuario { get; set; }
        public string NomeUsuario { get; set; }
        public string EmailUsuario { get; set; }

        [Required]
        [MinLength(6, ErrorMessage = " Requer no mínimo 6 e, no máximo, 10 caracteres")]
        [MaxLength(10, ErrorMessage = " Requer no mínimo 6 e, no máximo, 10 caracteres")]
        public string SenhaUsuario { get; set; }

        public virtual Tipousuario IdTipoUsuarioNavigation { get; set; }
        public virtual ICollection<ImagemUsuario> ImagemUsuarios { get; set; }
        public virtual ICollection<Medico> Medicos { get; set; }
        public virtual ICollection<Paciente> Pacientes { get; set; }
    }
}
