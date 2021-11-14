using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace senai.spmedicalgroup.webApi.Domains
{
    public partial class Consulta
    {
        [Key]
        public short IdConsulta { get; set; }
        [Required(ErrorMessage = "O Id do médico é necessário!")]
        public byte? IdSituacao { get; set; }
        [Required(ErrorMessage = "O Id do paciente é necessário!")]
        public short? IdPaciente { get; set; }
        public short? IdMedico { get; set; }
        public DateTime DataConsulta { get; set; }
        [Required(ErrorMessage = "A data da consulta")]
        public string DescricaoSituaConsulta { get; set; }

        public virtual Medico IdMedicoNavigation { get; set; }
        public virtual Paciente IdPacienteNavigation { get; set; }
        public virtual Situacao IdSituacaoNavigation { get; set; }
    }
}
