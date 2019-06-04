-- phpMyAdmin SQL Dump
-- version 4.5.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 04-Jun-2019 às 23:40
-- Versão do servidor: 5.7.11
-- PHP Version: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sistema_360`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `aluno`
--

CREATE TABLE `aluno` (
  `RA` int(11) NOT NULL,
  `Nome` varchar(50) NOT NULL,
  `Senha` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `aluno`
--

INSERT INTO `aluno` (`RA`, `Nome`, `Senha`) VALUES
(123456, 'João', '$2a$12$SGd6IOryFtv/SugHNMJ1FOXAYJiOfnvDWGrhU0GAk.tN53/8a/tlC'),
(178379, 'Vitor', '$2a$12$.rYSf15qweXNINjd.yvQle6kAdgywWNQSiw4wifaegkwGCADRX1nm');

-- --------------------------------------------------------

--
-- Estrutura da tabela `aluno_presente_aula`
--

CREATE TABLE `aluno_presente_aula` (
  `RA` int(11) NOT NULL,
  `Turma` varchar(12) NOT NULL,
  `idAula` int(11) NOT NULL,
  `Presenca` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `aluno_presente_aula`
--

INSERT INTO `aluno_presente_aula` (`RA`, `Turma`, `idAula`, `Presenca`) VALUES
(123456, 'SI250A', 1, 1),
(123456, 'SI250A', 2, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `aluno_realiza_atividade`
--

CREATE TABLE `aluno_realiza_atividade` (
  `RA` int(11) NOT NULL,
  `Assertividade` float NOT NULL,
  `Assiduidade` float NOT NULL,
  `Didatica` float NOT NULL,
  `Objetividade` float NOT NULL,
  `Participacao` float NOT NULL,
  `Proatividade` float NOT NULL,
  `Responsividade` float NOT NULL,
  `Nota` float DEFAULT NULL,
  `Observacao` varchar(300) DEFAULT NULL,
  `Peso_Avaliacao_Indiv` int(11) NOT NULL,
  `idAtividade` int(11) NOT NULL,
  `idGrupo` int(11) NOT NULL,
  `idTurma` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `aluno_turma`
--

CREATE TABLE `aluno_turma` (
  `idTurma` varchar(12) NOT NULL,
  `Nota` float NOT NULL DEFAULT '0',
  `Status` set('Em Andamento','Aprovado','Reprovado','Exame') NOT NULL DEFAULT 'Em Andamento',
  `idGrupo` int(11) DEFAULT NULL,
  `Aluno_RA` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `aluno_turma`
--

INSERT INTO `aluno_turma` (`idTurma`, `Nota`, `Status`, `idGrupo`, `Aluno_RA`) VALUES
('SI250A', 0, 'Em Andamento', 2, 123456),
('SI250A', 0, 'Em Andamento', NULL, 178379);

-- --------------------------------------------------------

--
-- Estrutura da tabela `atividade_grupo`
--

CREATE TABLE `atividade_grupo` (
  `idAtividade` int(11) NOT NULL,
  `Data_Apresentacao` date DEFAULT NULL,
  `Tópico` varchar(45) NOT NULL,
  `Num_Atividade` int(11) NOT NULL,
  `Conceito` varchar(70) DEFAULT NULL,
  `Objetivo` varchar(200) DEFAULT NULL,
  `Mentoria` date DEFAULT NULL,
  `Orient_1` date DEFAULT NULL,
  `Orient_2` date DEFAULT NULL,
  `Data_Apresent.` date DEFAULT NULL,
  `Peso_Avaliacao_Grupo` int(11) NOT NULL,
  `Observacao` varchar(300) DEFAULT NULL,
  `Grupo_idGrupo` int(11) NOT NULL,
  `Nota_Grupo` float DEFAULT NULL,
  `Nota_Final` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `aula`
--

CREATE TABLE `aula` (
  `idAula` int(11) NOT NULL,
  `idTurma` varchar(12) NOT NULL,
  `Data` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `aula`
--

INSERT INTO `aula` (`idAula`, `idTurma`, `Data`) VALUES
(1, 'SI250A', '2019-04-01'),
(2, 'SI250A', '2019-04-07'),
(3, 'SI250A', '2019-04-14');

-- --------------------------------------------------------

--
-- Estrutura da tabela `contribuicao`
--

CREATE TABLE `contribuicao` (
  `idTopico` varchar(10) NOT NULL,
  `RA` int(11) NOT NULL,
  `idTurma` varchar(12) NOT NULL,
  `Data` date NOT NULL,
  `Nota` set('0','0.5','1','1.5','2','2.5','3','3.5','4','4.5','5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `contribuicao`
--

INSERT INTO `contribuicao` (`idTopico`, `RA`, `idTurma`, `Data`, `Nota`) VALUES
('T1A1', 123456, 'SI250A', '2019-06-01', '1.5');

-- --------------------------------------------------------

--
-- Estrutura da tabela `debate`
--

CREATE TABLE `debate` (
  `RA` int(11) NOT NULL,
  `idTurma` varchar(12) NOT NULL,
  `perguntasFeitas` int(11) DEFAULT '0',
  `eficiencia` float DEFAULT NULL,
  `faltas` int(11) DEFAULT NULL,
  `eficiencia_regularizada` float DEFAULT NULL,
  `nota` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `grupo`
--

CREATE TABLE `grupo` (
  `idGrupo` int(11) NOT NULL,
  `NomeGrupo` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `grupo`
--

INSERT INTO `grupo` (`idGrupo`, `NomeGrupo`) VALUES
(1, 'Grupo 123'),
(2, 'Grupo A');

-- --------------------------------------------------------

--
-- Estrutura da tabela `objetos_de_avaliacao`
--

CREATE TABLE `objetos_de_avaliacao` (
  `idObjetos_de_avaliacao` int(11) NOT NULL,
  `Nome_objeto` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `objetos_de_avaliacao`
--

INSERT INTO `objetos_de_avaliacao` (`idObjetos_de_avaliacao`, `Nome_objeto`) VALUES
(1, 'Objeto de avaliação Número 1'),
(2, 'Objeto de avaliação Número 2');

-- --------------------------------------------------------

--
-- Estrutura da tabela `objetos_de_avaliacao_possuem_requisitos_de_avaliacao`
--

CREATE TABLE `objetos_de_avaliacao_possuem_requisitos_de_avaliacao` (
  `idObjetos_de_avaliacao` int(11) NOT NULL,
  `idRequisitos_de_avaliacao` int(11) NOT NULL,
  `conformidade` varchar(45) DEFAULT NULL,
  `inteligilibilidade` varchar(45) DEFAULT NULL,
  `trabalho em grupo` varchar(45) DEFAULT NULL,
  `idAtividade` int(11) NOT NULL,
  `idGrupo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `participacao`
--

CREATE TABLE `participacao` (
  `RA` int(11) NOT NULL,
  `idTurma` varchar(12) NOT NULL,
  `Numero_Questoes` int(11) DEFAULT '0',
  `Eficiencia` float DEFAULT '1',
  `Absenteismo` float DEFAULT '1',
  `Nota` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `professor`
--

CREATE TABLE `professor` (
  `Matricula` int(11) NOT NULL,
  `Nome` varchar(45) NOT NULL,
  `Senha` varchar(100) NOT NULL,
  `Permissao` set('Docente','PED','PAD') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `professor`
--

INSERT INTO `professor` (`Matricula`, `Nome`, `Senha`, `Permissao`) VALUES
(112233, 'Carlos', '$2a$12$N4erZX3IMA2o2LrzLR0GEO14yGNGFrZ0xg4mBb4FwSXKWbxGVCqnS', 'Docente');

-- --------------------------------------------------------

--
-- Estrutura da tabela `professor_leciona_turma`
--

CREATE TABLE `professor_leciona_turma` (
  `Matricula` int(11) NOT NULL,
  `idTurma` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `professor_leciona_turma`
--

INSERT INTO `professor_leciona_turma` (`Matricula`, `idTurma`) VALUES
(112233, 'SI250A');

-- --------------------------------------------------------

--
-- Estrutura da tabela `requisitos_de_avaliacao`
--

CREATE TABLE `requisitos_de_avaliacao` (
  `idRequisitos_de_avaliacao` int(11) NOT NULL,
  `Nome_requisito` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `requisitos_de_avaliacao`
--

INSERT INTO `requisitos_de_avaliacao` (`idRequisitos_de_avaliacao`, `Nome_requisito`) VALUES
(1, 'Requisito de avaliação Número 1'),
(2, 'Requisito de avaliação Número 2');

-- --------------------------------------------------------

--
-- Estrutura da tabela `rodadas_debate`
--

CREATE TABLE `rodadas_debate` (
  `idRodadaDebate` int(11) NOT NULL,
  `RA` int(11) NOT NULL,
  `idTurma` varchar(12) NOT NULL,
  `idTopico` varchar(10) NOT NULL,
  `Topico` varchar(45) NOT NULL,
  `Data` date NOT NULL,
  `Participacao` int(11) NOT NULL,
  `Assertividade` set('0','1','2') NOT NULL,
  `Alteridade` set('0','1','2','3') NOT NULL,
  `Didatica` set('0','1','2','3') NOT NULL,
  `Categorico` set('0','1') NOT NULL,
  `Evasivo` set('0','1') NOT NULL,
  `Total` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `topico`
--

CREATE TABLE `topico` (
  `idTopico` varchar(10) NOT NULL,
  `nomeTopico` varchar(45) NOT NULL,
  `idTurma` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `topico`
--

INSERT INTO `topico` (`idTopico`, `nomeTopico`, `idTurma`) VALUES
('T1A1', 'A aplicação de juros compostos no dia a dia', 'SI250A'),
('T1A2', 'Outro topico', 'SI250A'),
('T1A3', 'Mais um tópico', 'SI250A'),
('T2A1', 'Novamente mais um tópico', 'SI250A');

-- --------------------------------------------------------

--
-- Estrutura da tabela `turma`
--

CREATE TABLE `turma` (
  `idTurma` varchar(20) NOT NULL,
  `Disciplina` varchar(100) NOT NULL,
  `Semestre` set('S1','S2') NOT NULL,
  `Ano` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `turma`
--

INSERT INTO `turma` (`idTurma`, `Disciplina`, `Semestre`, `Ano`) VALUES
('SI250A', 'Economia', 'S1', 2019),
('SI260A', 'Economia e Finanças', 'S1', 2019);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aluno`
--
ALTER TABLE `aluno`
  ADD PRIMARY KEY (`RA`);

--
-- Indexes for table `aluno_presente_aula`
--
ALTER TABLE `aluno_presente_aula`
  ADD PRIMARY KEY (`RA`,`Turma`,`idAula`),
  ADD KEY `fk_Aluno_Turma_has_Aula_Aluno_Turma1` (`Turma`),
  ADD KEY `fk_Aluno_Turma_has_Aula_Aula1_idx` (`idAula`),
  ADD KEY `fk_Aluno_Turma_has_Aula_Aluno_Turma1_idx` (`RA`,`Turma`);

--
-- Indexes for table `aluno_realiza_atividade`
--
ALTER TABLE `aluno_realiza_atividade`
  ADD PRIMARY KEY (`RA`),
  ADD KEY `fk_Aluno_realiza_Atividade_Atividade1_idx` (`idAtividade`,`idGrupo`),
  ADD KEY `fk_Aluno_realiza_Atividade_Aluno_Turma1_idx` (`idTurma`);

--
-- Indexes for table `aluno_turma`
--
ALTER TABLE `aluno_turma`
  ADD PRIMARY KEY (`idTurma`,`Aluno_RA`),
  ADD KEY `fk_Aluno_has_Turma_Turma1_idx` (`idTurma`),
  ADD KEY `fk_Aluno_Turma_Grupo1_idx` (`idGrupo`),
  ADD KEY `fk_Aluno_Turma_Aluno1_idx` (`Aluno_RA`);

--
-- Indexes for table `atividade_grupo`
--
ALTER TABLE `atividade_grupo`
  ADD PRIMARY KEY (`idAtividade`,`Grupo_idGrupo`),
  ADD KEY `fk_Atividade_Grupo1_idx` (`Grupo_idGrupo`);

--
-- Indexes for table `aula`
--
ALTER TABLE `aula`
  ADD PRIMARY KEY (`idAula`),
  ADD KEY `fk_Aulas_Turma1_idx` (`idTurma`);

--
-- Indexes for table `contribuicao`
--
ALTER TABLE `contribuicao`
  ADD PRIMARY KEY (`idTopico`,`RA`,`idTurma`) USING BTREE,
  ADD KEY `fk_Contribuicao_Participacao1_idx` (`RA`,`idTurma`);

--
-- Indexes for table `debate`
--
ALTER TABLE `debate`
  ADD PRIMARY KEY (`RA`,`idTurma`),
  ADD KEY `fk_Debate_Aluno_Turma1` (`idTurma`);

--
-- Indexes for table `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`idGrupo`);

--
-- Indexes for table `objetos_de_avaliacao`
--
ALTER TABLE `objetos_de_avaliacao`
  ADD PRIMARY KEY (`idObjetos_de_avaliacao`);

--
-- Indexes for table `objetos_de_avaliacao_possuem_requisitos_de_avaliacao`
--
ALTER TABLE `objetos_de_avaliacao_possuem_requisitos_de_avaliacao`
  ADD PRIMARY KEY (`idObjetos_de_avaliacao`,`idRequisitos_de_avaliacao`,`idAtividade`,`idGrupo`),
  ADD KEY `fk_Objetos_de_avaliacao_has_Requisitos_de_avaliacao_Requisi_idx` (`idRequisitos_de_avaliacao`),
  ADD KEY `fk_Objetos_de_avaliacao_has_Requisitos_de_avaliacao_Objetos_idx` (`idObjetos_de_avaliacao`),
  ADD KEY `fk_Objetos_de_avaliacao_has_Requisitos_de_avaliacao_Ativida_idx` (`idAtividade`,`idGrupo`);

--
-- Indexes for table `participacao`
--
ALTER TABLE `participacao`
  ADD PRIMARY KEY (`RA`,`idTurma`);

--
-- Indexes for table `professor`
--
ALTER TABLE `professor`
  ADD PRIMARY KEY (`Matricula`);

--
-- Indexes for table `professor_leciona_turma`
--
ALTER TABLE `professor_leciona_turma`
  ADD PRIMARY KEY (`Matricula`,`idTurma`),
  ADD KEY `fk_Professor_has_Turma_Turma1_idx` (`idTurma`),
  ADD KEY `fk_Professor_has_Turma_Professor1_idx` (`Matricula`);

--
-- Indexes for table `requisitos_de_avaliacao`
--
ALTER TABLE `requisitos_de_avaliacao`
  ADD PRIMARY KEY (`idRequisitos_de_avaliacao`);

--
-- Indexes for table `rodadas_debate`
--
ALTER TABLE `rodadas_debate`
  ADD PRIMARY KEY (`idRodadaDebate`,`RA`,`idTurma`),
  ADD KEY `fk_Rodadas_Debate_Topico1_idx` (`idTopico`),
  ADD KEY `fk_Rodadas_Debate_Debate1_idx` (`RA`,`idTurma`);

--
-- Indexes for table `topico`
--
ALTER TABLE `topico`
  ADD PRIMARY KEY (`idTopico`,`idTurma`),
  ADD KEY `fk_Topico_Turma1_idx` (`idTurma`);

--
-- Indexes for table `turma`
--
ALTER TABLE `turma`
  ADD PRIMARY KEY (`idTurma`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `atividade_grupo`
--
ALTER TABLE `atividade_grupo`
  MODIFY `idAtividade` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `aula`
--
ALTER TABLE `aula`
  MODIFY `idAula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `grupo`
--
ALTER TABLE `grupo`
  MODIFY `idGrupo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `objetos_de_avaliacao`
--
ALTER TABLE `objetos_de_avaliacao`
  MODIFY `idObjetos_de_avaliacao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `requisitos_de_avaliacao`
--
ALTER TABLE `requisitos_de_avaliacao`
  MODIFY `idRequisitos_de_avaliacao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `rodadas_debate`
--
ALTER TABLE `rodadas_debate`
  MODIFY `idRodadaDebate` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `aluno_presente_aula`
--
ALTER TABLE `aluno_presente_aula`
  ADD CONSTRAINT `fk_Aluno_Turma_has_Aula_Aluno_Turma1` FOREIGN KEY (`Turma`) REFERENCES `aluno_turma` (`idTurma`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Aluno_Turma_has_Aula_Aula1` FOREIGN KEY (`idAula`) REFERENCES `aula` (`idAula`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Aluno_Turma_has_RA_Aluno_Turma1` FOREIGN KEY (`RA`) REFERENCES `aluno_turma` (`Aluno_RA`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `aluno_realiza_atividade`
--
ALTER TABLE `aluno_realiza_atividade`
  ADD CONSTRAINT `fk_Aluno_realiza_Atividade_Aluno_Turma1` FOREIGN KEY (`idTurma`) REFERENCES `aluno_turma` (`idTurma`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Aluno_realiza_Atividade_Atividade1` FOREIGN KEY (`idAtividade`,`idGrupo`) REFERENCES `atividade_grupo` (`idAtividade`, `Grupo_idGrupo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `aluno_turma`
--
ALTER TABLE `aluno_turma`
  ADD CONSTRAINT `fk_Aluno_Turma_Aluno1` FOREIGN KEY (`Aluno_RA`) REFERENCES `aluno` (`RA`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Aluno_Turma_Grupo1` FOREIGN KEY (`idGrupo`) REFERENCES `grupo` (`idGrupo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Aluno_has_Turma_Turma1` FOREIGN KEY (`idTurma`) REFERENCES `turma` (`idTurma`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `atividade_grupo`
--
ALTER TABLE `atividade_grupo`
  ADD CONSTRAINT `fk_Atividade_Grupo1` FOREIGN KEY (`Grupo_idGrupo`) REFERENCES `grupo` (`idGrupo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `aula`
--
ALTER TABLE `aula`
  ADD CONSTRAINT `fk_Aulas_Turma1` FOREIGN KEY (`idTurma`) REFERENCES `turma` (`idTurma`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `contribuicao`
--
ALTER TABLE `contribuicao`
  ADD CONSTRAINT `fk_Contribuicao_Participacao1` FOREIGN KEY (`RA`,`idTurma`) REFERENCES `aluno_turma` (`Aluno_RA`, `idTurma`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Contribuicao_Topico1` FOREIGN KEY (`idTopico`) REFERENCES `topico` (`idTopico`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `debate`
--
ALTER TABLE `debate`
  ADD CONSTRAINT `fk_Debate_Aluno_Turma1` FOREIGN KEY (`idTurma`) REFERENCES `aluno_turma` (`idTurma`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `objetos_de_avaliacao_possuem_requisitos_de_avaliacao`
--
ALTER TABLE `objetos_de_avaliacao_possuem_requisitos_de_avaliacao`
  ADD CONSTRAINT `fk_Objetos_de_avaliacao_has_Requisitos_de_avaliacao_Atividade1` FOREIGN KEY (`idAtividade`,`idGrupo`) REFERENCES `atividade_grupo` (`idAtividade`, `Grupo_idGrupo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Objetos_de_avaliacao_has_Requisitos_de_avaliacao_Objetos_d1` FOREIGN KEY (`idObjetos_de_avaliacao`) REFERENCES `objetos_de_avaliacao` (`idObjetos_de_avaliacao`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Objetos_de_avaliacao_has_Requisitos_de_avaliacao_Requisito1` FOREIGN KEY (`idRequisitos_de_avaliacao`) REFERENCES `requisitos_de_avaliacao` (`idRequisitos_de_avaliacao`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `participacao`
--
ALTER TABLE `participacao`
  ADD CONSTRAINT `fk_Participacao_Aluno_Presente_Aula1` FOREIGN KEY (`RA`,`idTurma`) REFERENCES `aluno_turma` (`Aluno_RA`, `idTurma`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `professor_leciona_turma`
--
ALTER TABLE `professor_leciona_turma`
  ADD CONSTRAINT `fk_Professor_has_Turma_Professor1` FOREIGN KEY (`Matricula`) REFERENCES `professor` (`Matricula`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Professor_has_Turma_Turma1` FOREIGN KEY (`idTurma`) REFERENCES `turma` (`idTurma`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `rodadas_debate`
--
ALTER TABLE `rodadas_debate`
  ADD CONSTRAINT `fk_Rodadas_Debate_Debate1` FOREIGN KEY (`RA`,`idTurma`) REFERENCES `debate` (`RA`, `idTurma`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Rodadas_Debate_Topico1` FOREIGN KEY (`idTopico`) REFERENCES `topico` (`idTopico`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `topico`
--
ALTER TABLE `topico`
  ADD CONSTRAINT `fk_Topico_Turma1` FOREIGN KEY (`idTurma`) REFERENCES `turma` (`idTurma`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
