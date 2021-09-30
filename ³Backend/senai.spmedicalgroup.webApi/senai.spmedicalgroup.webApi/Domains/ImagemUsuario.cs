using System;
using System.Collections.Generic;

#nullable disable

namespace senai.spmedicalgroup.webApi.Domains
{
    public partial class ImagemUsuario
    {
        public short Id { get; set; }
        public short? IdUsuario { get; set; }
        public byte[] Binario { get; set; }
        public string MymeType { get; set; }
        public string NomeArquivo { get; set; }
        public DateTime DataInclusao { get; set; }

        public virtual Usuario IdUsuarioNavigation { get; set; }
        
    }
}
