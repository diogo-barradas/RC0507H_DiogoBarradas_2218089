-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 18-Fev-2021 às 15:35
-- Versão do servidor: 10.4.17-MariaDB
-- versão do PHP: 8.0.1

CREATE SCHEMA `santa`;
use santa;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `santa`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `comportamento`
--

CREATE TABLE `comportamento` (
  `comportamento_id` int(11) NOT NULL,
  `condicao` bit(1) NOT NULL,
  `descricao` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `comportamento`
--

INSERT INTO `comportamento` (`comportamento_id`, `condicao`, `descricao`) VALUES
(1, b'1', 'Recebe'),
(2, b'0', 'Não recebe');

-- --------------------------------------------------------

--
-- Estrutura da tabela `criancas`
--

CREATE TABLE `criancas` (
  `crianca_id` int(11) NOT NULL,
  `idade` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `presente_id` int(11) DEFAULT NULL,
  `comportamento_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `criancas`
--

INSERT INTO `criancas` (`crianca_id`, `idade`, `nome`, `presente_id`, `comportamento_id`) VALUES
(1, 22, 'Diogo Barradas', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `presentes`
--

CREATE TABLE `presentes` (
  `presente_id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `quantidade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `presentes`
--

INSERT INTO `presentes` (`presente_id`, `nome`, `quantidade`) VALUES
(1, 'PS5', 100),
(2, 'Xbox', 10);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `comportamento`
--
ALTER TABLE `comportamento`
  ADD PRIMARY KEY (`comportamento_id`);

--
-- Índices para tabela `criancas`
--
ALTER TABLE `criancas`
  ADD PRIMARY KEY (`crianca_id`),
  ADD KEY `criancas_FK` (`presente_id`),
  ADD KEY `criancas_FK_1` (`comportamento_id`);

--
-- Índices para tabela `presentes`
--
ALTER TABLE `presentes`
  ADD PRIMARY KEY (`presente_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `comportamento`
--
ALTER TABLE `comportamento`
  MODIFY `comportamento_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `criancas`
--
ALTER TABLE `criancas`
  MODIFY `crianca_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de tabela `presentes`
--
ALTER TABLE `presentes`
  MODIFY `presente_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `criancas`
--
ALTER TABLE `criancas`
  ADD CONSTRAINT `criancas_FK` FOREIGN KEY (`presente_id`) REFERENCES `presentes` (`presente_id`),
  ADD CONSTRAINT `criancas_FK_1` FOREIGN KEY (`comportamento_id`) REFERENCES `comportamento` (`comportamento_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
