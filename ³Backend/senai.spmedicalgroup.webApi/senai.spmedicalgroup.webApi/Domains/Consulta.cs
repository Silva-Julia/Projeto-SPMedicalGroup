using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace senai.spmedicalgroup.webApi.Domains
{
    public partial class Consulta
    {
        [Key]
        [Required(ErrorMessage = "O Id do médico é necessário!")]
        public short IdConsulta { get; set; }

        [Required(ErrorMessage = "O Id da situação é necessário!")]
        public byte? IdSituacao { get; set; }
        public short? IdPaciente { get; set; }

        [Required(ErrorMessage = "O Id do médico é necessário!")]
        public short? IdMedico { get; set; }

        [Required(ErrorMessage = "A data da consulta")]
        public DateTime DataConsulta { get; set; }
        public string DescricaoSituaConsulta { get; set; }

        public virtual Medico IdMedicoNavigation { get; set; }
        public virtual Paciente IdPacienteNavigation { get; set; }
        public virtual Situacao IdSituacaoNavigation { get; set; }
    }
}
