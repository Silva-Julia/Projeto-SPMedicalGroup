using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace senai.spmedicalgroup.webApi.Domains
{
    public partial class Clinica
    {
        public Clinica()
        {
            Medicos = new HashSet<Medico>();
        }

        public short IdClinica { get; set; }
        public string NomeClinica { get; set; }
        public string Endereco { get; set; }

        [MinLength(14, ErrorMessage = "O cnpj deve conter 14 dígitos"), MaxLength(14, ErrorMessage = "O cnpj deve conter 14 dígitos")]
        public string Cnpj { get; set; }
        public string RazaoSocial { get; set; }

        public virtual ICollection<Medico> Medicos { get; set; }
    }
}
