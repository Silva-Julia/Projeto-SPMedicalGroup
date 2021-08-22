USE MEDICALGROUP_JULIA;
GO

--Listagem de todos os paciente do sistema
SELECT nomeUsuario 'Nome do Paciente', emailUsuario 'Email do paciente', titulotipoUsuario 'tipo de usuário',cpf
FROM USUARIO u
INNER JOIN PACIENTE p
ON u.idUsuario = p.idUsuario
INNER JOIN TIPOUSUARIO tu
ON tu.idTipoUsuario = u.idTipoUsuario


--Listagem de todos os médicos cadastrados
SELECT * FROM USUARIO u
INNER JOIN MEDICO m
ON u.idUsuario = m.idUsuario


--Listagem dos pacientes cadastrados no sistema
SELECT nomeUsuario, emailUsuario, ISNULL (cpf, 'Não cadastrado') cpf, enderecoPaciente
FROM usuario u
INNER JOIN paciente
ON u.idUsuario = paciente.idUsuario


--Funções

CREATE FUNCTION MED_ESPC(@descricaoEspecialidade VARCHAR(100))
RETURNS TABLE
AS
RETURN
(
 SELECT @descricaoEspecialidade AS Especialidade, COUNT(idEspecialidade) [Numero De Médicos] FROM especialidade
 WHERE descricaoEspecialidade LIKE '%'+ @descricaoEspecialidade +'%'
)
GO

CREATE PROCEDURE IDADE
@nomeUsuario VARCHAR(50)
AS
BEGIN
 SELECT U.nomeUsuario, DATEDIFF(YEAR, P.dataNascimento, GETDATE()) AS Idade  FROM paciente P
 INNER JOIN usuario U
 ON P.idUsuario = U.idUsuario
 WHERE U.nomeUsuario = @nomeUsuario
END
GO