USE MEDICALGROUP_JULIA;
GO

INSERT INTO TIPOUSUARIO
VALUES ('Admin'), ('Comum'), ('Médico')
GO

INSERT INTO USUARIO (idTipoUsuario, nomeUsuario, emailUsuario, senhaUsuario)
VALUES (3, 'Ricardo Lemos', 'ricardo.lemos@spmedicalgroup.com.br', '1234'), 
       (3, 'Roberto Possarle', 'roberto.possarle@spmedicalgroup.com.br', '1234'), 
	   (3, 'Helena Strada', 'helena.souza@spmedicalgroup.com.br', '1234'),
	   (2, 'Ligia', 'Ligia@email.com', '1234'), (2, 'Alexandre', 'Alexandre@email.com', '1234'), 
	   (2, 'Fernando', 'Fernando@email.com', '1234'), (2, 'Henrique', 'Henrique@email.com', '1234'), 
	   (2, 'João', 'João@email.com', '1234'), (2, 'Bruno', 'Bruno@email.com', '1234'), (2, 'Mariana', 'Mariana@email.com', '1234'),
	   (1, 'Rafaela', 'Rafaela@email.com', '1234');
GO

INSERT INTO ESPECIALIDADE
VALUES ('Acupuntura'),('Anestesiologia'),('Angiologia'),('Cardiologia'),('Cirurgia Cardiovascular'),('Cirurgia da mão'),('Cirurgia do aparelho digestivo'),
('Cirurgia Geral'),('Cirurgia Pediátrica'),('Cirurgia Plástica'),('Cirurgia Torácica'),('Cirurgia Vascular'),('Dermatologia'),('Radioterapia'),('Urologia'),
('Pediatria'), ('Psiquiatria');
GO

INSERT INTO CLINICA (nomeClinica, endereco, razaoSocial , cnpj)
VALUES ('Clinica Possarle', 'Av. Barão Limeira, 532, São Paulo, SP', 'SP Medical Group', '86.400.902/0001-30');
GO

INSERT INTO SITUACAO
VALUES ('Realizada'), ('Agendada'), ('Cancelada');
GO


INSERT INTO PACIENTE (idUsuario, nomePaciente, dataNascimento, cpf, enderecoPaciente)
VALUES (4, 'Ligia', '13-10-1983', '94839859000', 'Rua Estado de Israel 240, São Paulo, Estado de São Paulo, 04022-000'), 
(5, 'Alexandre','23-07-2001',  '73556944057', 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200'),
(6, 'Fernando','10-10-1978',  '16839338002', 'Av. Ibirapuera - Indianópolis, 2927,  São Paulo - SP, 04029-200'),
(7, 'Henrique','13/10/1985',  '14332654765', 'R. Vitória, 120 - Vila Sao Jorge, Barueri - SP, 06402-030'),
(8, 'João', '27/08/1975',  '91305348010', 'R. Ver. Geraldo de Camargo, 66 - Santa Luzia, Ribeirão Pires - SP, 09405-380'), 
(9, 'Bruno', '21/03/1972',  '79799299004','Alameda dos Arapanés, 945 - Indianópolis, São Paulo - SP, 04524-001'),
(10, 'Mariana','05/03/2018',  '13771913039', 'R Sao Antonio, 232 - Vila Universal, Barueri - SP, 06407-140');
GO

INSERT INTO MEDICO (idUsuario, idEspecialidade, idClinica, crm)
VALUES (1, 2, 1, '54356-SP'), (2, 16, 1, '53452-SP'), (3, 17, 1, '65463-SP');
GO

INSERT INTO CONSULTA (idMedico, idSituacao, idPaciente, dataConsulta)
VALUES (3, 1, 7, '20/01/2020  15:00'), 
(2, 3, 2, '06/01/2020  10:00'), 
(2, 1, 3, '07/02/2020  11:00'), 
(2, 1, 2, '06/02/2018  10:00'),
(1, 3, 4, '07/02/2019  11:00'), 
(3, 2, 7, '08/03/2020  15:00'), 
(1, 2, 4, '09/03/2020  11:00');
GO