using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace senai.spmedicalgroup.webApi.Domains
{
    public partial class Consultum
    {
        public int IdConsulta { get; set; }
        public byte? IdSituacao { get; set; }
        public int? IdPaciente { get; set; }
        [Required(ErrorMessage = "O médico é obrigatório")]
        public short? IdMedico { get; set; }
        public DateTime DataConsulta { get; set; }
        public string SituacaoConsulta { get; set; }

        public virtual Medico IdMedicoNavigation { get; set; }
        public virtual Paciente IdPacienteNavigation { get; set; }
        public virtual Situacao IdSituacaoNavigation { get; set; }
    }
}
