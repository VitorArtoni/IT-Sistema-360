SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `calcular_eficiencia` (IN `turma` VARCHAR(12))  BEGIN
	DECLARE finished INTEGER DEFAULT 0;
	DECLARE v_ra INT DEFAULT 0;
	DECLARE v_eficiencia FLOAT DEFAULT 0.0;
	DECLARE n_topicos INT DEFAULT 0;
	DECLARE v_intervencoes INT DEFAULT 0;

	DECLARE ra_cursor CURSOR FOR SELECT RA FROM participacao WHERE idTurma = turma;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;

	OPEN ra_cursor;

	calcular: LOOP
		FETCH ra_cursor INTO v_ra;
		IF finished = 1 THEN
			LEAVE calcular;
		END IF;

		SELECT COUNT(*) INTO n_topicos FROM topico WHERE idTurma = turma;
		SELECT COUNT(*) INTO v_intervencoes FROM contribuicao WHERE idTurma = turma AND RA = v_ra;
		SELECT (SUM(NOTA)/n_topicos/n_topicos)*v_intervencoes INTO v_eficiencia FROM contribuicao WHERE idTurma = turma AND RA = v_ra;
		
		INSERT INTO participacao(RA,idTurma,Eficiencia) 
		VALUES (v_ra,turma,v_eficiencia) 
		ON DUPLICATE KEY 
		UPDATE Eficiencia=VALUES(Eficiencia);
	END LOOP calcular;

	CLOSE ra_cursor;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `calcular_participacao` (IN `turma` VARCHAR(12))  BEGIN
	DECLARE finished INTEGER DEFAULT 0;
	DECLARE v_ra INT DEFAULT 0;
	DECLARE v_nota FLOAT DEFAULT 0.0;

	DECLARE ra_cursor CURSOR FOR SELECT RA FROM participacao WHERE idTurma = turma;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;

	OPEN ra_cursor;

	calcular: LOOP
		FETCH ra_cursor INTO v_ra;
		IF finished = 1 THEN
			LEAVE calcular;
		END IF;		
		
		SELECT (Eficiencia/(SELECT MAX(Eficiencia) FROM participacao))*10 INTO v_nota
		FROM participacao
		WHERE RA = v_ra AND idTurma = turma;
		
		UPDATE participacao p
		SET Nota = v_nota
		WHERE p.RA = v_ra AND p.idTurma = turma;
	END LOOP calcular;

	CLOSE ra_cursor;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `inicializar_alunos_atividade_grupo` (IN `grupo` INT, `topico` VARCHAR(10), `turma` VARCHAR(12))  BEGIN
	DECLARE v_ra INTEGER DEFAULT 0;
	DECLARE finished INTEGER DEFAULT 0;
	DECLARE ra_cursor CURSOR FOR SELECT Aluno_RA FROM aluno_turma WHERE idGrupo = grupo AND idTurma = turma;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;

	OPEN ra_cursor;

	calcular: LOOP
		FETCH ra_cursor INTO v_ra;
		IF finished = 1 THEN
			LEAVE calcular;
		END IF;

		INSERT INTO aluno_realiza_atividade(Aluno_RA,idGrupo,idTopico,idTurma,Nota) 
		VALUES (v_ra,grupo,topico,turma,0) 
		ON DUPLICATE KEY 
		UPDATE Aluno_RA = VALUES(Aluno_RA);
	END LOOP calcular;

	CLOSE ra_cursor;
END$$

DELIMITER ;

CREATE TABLE `aluno` (
  `RA` int(11) NOT NULL,
  `Nome` varchar(50) NOT NULL,
  `Senha` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `aluno_presente_aula` (
  `RA` int(11) NOT NULL,
  `Turma` varchar(12) NOT NULL,
  `idAula` int(11) NOT NULL,
  `Presenca` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `aluno_realiza_atividade` (
  `Aluno_RA` int(11) NOT NULL,
  `idGrupo` int(11) NOT NULL,
  `idTopico` varchar(10) NOT NULL,
  `idTurma` varchar(12) NOT NULL,
  `Nota` float NOT NULL,
  `Observacao` varchar(3000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `aluno_turma` (
  `idTurma` varchar(12) NOT NULL,
  `Aluno_RA` int(11) NOT NULL,
  `Nota` float NOT NULL DEFAULT '0',
  `Status` set('Em Andamento','Aprovado','Reprovado','Exame') NOT NULL DEFAULT 'Em Andamento',
  `idGrupo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `atividade_grupo` (
  `idGrupo` int(11) NOT NULL,
  `idTopico` varchar(10) NOT NULL,
  `idTurma` varchar(12) NOT NULL,
  `Observacao` varchar(3000) DEFAULT NULL,
  `Conformidade` float NOT NULL DEFAULT '0',
  `Interesse` float NOT NULL DEFAULT '0',
  `Contextualizacao` float NOT NULL DEFAULT '0',
  `Consistencia` float NOT NULL DEFAULT '0',
  `Nota_Grupo` float DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `aula` (
  `idAula` int(11) NOT NULL,
  `idTurma` varchar(12) NOT NULL,
  `Data` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `contribuicao` (
  `idTopico` varchar(10) NOT NULL,
  `RA` int(11) NOT NULL,
  `idTurma` varchar(12) NOT NULL,
  `Nota` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `grupo` (
  `idGrupo` int(11) NOT NULL,
  `NomeGrupo` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `parametro` (
  `Nome` varchar(20) NOT NULL,
  `Chave` varchar(20) NOT NULL,
  `Valor` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `participacao` (
  `RA` int(11) NOT NULL,
  `idTurma` varchar(12) NOT NULL,
  `Eficiencia` float DEFAULT '1',
  `Nota` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `professor` (
  `Matricula` int(11) NOT NULL,
  `Nome` varchar(45) NOT NULL,
  `Senha` varchar(100) NOT NULL,
  `Permissao` set('Docente','PED','PAD') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `professor_leciona_turma` (
  `Matricula` int(11) NOT NULL,
  `idTurma` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `topico` (
  `idTopico` varchar(10) NOT NULL,
  `nomeTopico` varchar(45) NOT NULL,
  `objetivo` varchar(100) DEFAULT NULL,
  `idTurma` varchar(12) NOT NULL,
  `Data` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `turma` (
  `idTurma` varchar(20) NOT NULL,
  `Disciplina` varchar(100) NOT NULL,
  `Semestre` set('S1','S2') NOT NULL,
  `Ano` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `aluno`
  ADD PRIMARY KEY (`RA`);

ALTER TABLE `aluno_presente_aula`
  ADD PRIMARY KEY (`RA`,`Turma`,`idAula`),
  ADD KEY `fk_aula_has_aluno_turma_aluno_turma1_idx` (`Turma`,`RA`),
  ADD KEY `fk_aula_has_aluno_turma_aula1_idx` (`idAula`);

ALTER TABLE `aluno_realiza_atividade`
  ADD PRIMARY KEY (`Aluno_RA`,`idGrupo`,`idTopico`,`idTurma`),
  ADD KEY `fk_aluno_turma_has_atividade_grupo_atividade_grupo1_idx` (`idGrupo`,`idTopico`,`idTurma`),
  ADD KEY `fk_aluno_turma_has_atividade_grupo_aluno_turma1_idx` (`Aluno_RA`);

ALTER TABLE `aluno_turma`
  ADD PRIMARY KEY (`idTurma`,`Aluno_RA`),
  ADD KEY `fk_Aluno_has_Turma_Turma1_idx` (`idTurma`),
  ADD KEY `fk_Aluno_Turma_Grupo1_idx` (`idGrupo`),
  ADD KEY `fk_Aluno_Turma_Aluno1_idx` (`Aluno_RA`);

ALTER TABLE `atividade_grupo`
  ADD PRIMARY KEY (`idGrupo`,`idTopico`,`idTurma`),
  ADD KEY `fk_Atividade_Grupo1_idx` (`idGrupo`),
  ADD KEY `fk_atividade_grupo_topico1_idx` (`idTopico`,`idTurma`);

ALTER TABLE `aula`
  ADD PRIMARY KEY (`idAula`),
  ADD KEY `fk_Aulas_Turma1_idx` (`idTurma`);

ALTER TABLE `contribuicao`
  ADD PRIMARY KEY (`idTopico`,`RA`,`idTurma`) USING BTREE,
  ADD KEY `fk_Contribuicao_Participacao1_idx` (`RA`,`idTurma`);

ALTER TABLE `grupo`
  ADD PRIMARY KEY (`idGrupo`);

ALTER TABLE `parametro`
  ADD PRIMARY KEY (`Nome`,`Chave`);

ALTER TABLE `participacao`
  ADD PRIMARY KEY (`RA`,`idTurma`);

ALTER TABLE `professor`
  ADD PRIMARY KEY (`Matricula`);

ALTER TABLE `professor_leciona_turma`
  ADD PRIMARY KEY (`Matricula`,`idTurma`),
  ADD KEY `fk_Professor_has_Turma_Turma1_idx` (`idTurma`),
  ADD KEY `fk_Professor_has_Turma_Professor1_idx` (`Matricula`);

ALTER TABLE `topico`
  ADD PRIMARY KEY (`idTopico`,`idTurma`),
  ADD KEY `fk_Topico_Turma1_idx` (`idTurma`);

ALTER TABLE `turma`
  ADD PRIMARY KEY (`idTurma`);


ALTER TABLE `aula`
  MODIFY `idAula` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `grupo`
  MODIFY `idGrupo` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `aluno_presente_aula`
  ADD CONSTRAINT `fk_aula_has_aluno_turma_aluno_turma1` FOREIGN KEY (`Turma`,`RA`) REFERENCES `aluno_turma` (`idTurma`, `Aluno_RA`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_aula_has_aluno_turma_aula1` FOREIGN KEY (`idAula`) REFERENCES `aula` (`idAula`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `aluno_realiza_atividade`
  ADD CONSTRAINT `fk_aluno_turma_has_atividade_grupo_aluno_turma1` FOREIGN KEY (`Aluno_RA`) REFERENCES `aluno_turma` (`Aluno_RA`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_aluno_turma_has_atividade_grupo_atividade_grupo1` FOREIGN KEY (`idGrupo`,`idTopico`,`idTurma`) REFERENCES `atividade_grupo` (`idGrupo`, `idTopico`, `idTurma`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `aluno_turma`
  ADD CONSTRAINT `fk_Aluno_Turma_Aluno1` FOREIGN KEY (`Aluno_RA`) REFERENCES `aluno` (`RA`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Aluno_Turma_Grupo1` FOREIGN KEY (`idGrupo`) REFERENCES `grupo` (`idGrupo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Aluno_has_Turma_Turma1` FOREIGN KEY (`idTurma`) REFERENCES `turma` (`idTurma`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `atividade_grupo`
  ADD CONSTRAINT `fk_Atividade_Grupo1` FOREIGN KEY (`idGrupo`) REFERENCES `grupo` (`idGrupo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_atividade_grupo_topico1` FOREIGN KEY (`idTopico`,`idTurma`) REFERENCES `topico` (`idTopico`, `idTurma`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `aula`
  ADD CONSTRAINT `fk_Aulas_Turma1` FOREIGN KEY (`idTurma`) REFERENCES `turma` (`idTurma`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `contribuicao`
  ADD CONSTRAINT `fk_Contribuicao_Participacao1` FOREIGN KEY (`RA`,`idTurma`) REFERENCES `aluno_turma` (`Aluno_RA`, `idTurma`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Contribuicao_Topico1` FOREIGN KEY (`idTopico`) REFERENCES `topico` (`idTopico`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `participacao`
  ADD CONSTRAINT `fk_Participacao_Aluno_Presente_Aula1` FOREIGN KEY (`RA`,`idTurma`) REFERENCES `aluno_turma` (`Aluno_RA`, `idTurma`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `professor_leciona_turma`
  ADD CONSTRAINT `fk_Professor_has_Turma_Professor1` FOREIGN KEY (`Matricula`) REFERENCES `professor` (`Matricula`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Professor_has_Turma_Turma1` FOREIGN KEY (`idTurma`) REFERENCES `turma` (`idTurma`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `topico`
  ADD CONSTRAINT `fk_Topico_Turma1` FOREIGN KEY (`idTurma`) REFERENCES `turma` (`idTurma`) ON DELETE NO ACTION ON UPDATE NO ACTION;
