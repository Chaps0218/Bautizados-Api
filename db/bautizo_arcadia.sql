-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: bautizos_arcadia
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bautizado`
--

DROP TABLE IF EXISTS `bautizado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bautizado` (
  `bau_id` int NOT NULL AUTO_INCREMENT,
  `bau_nombre` varchar(150) COLLATE utf8mb3_spanish_ci NOT NULL,
  `bau_padre` varchar(150) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `bau_madre` varchar(150) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `bau_padrino1` varchar(150) COLLATE utf8mb3_spanish_ci NOT NULL,
  `bau_padrino2` varchar(150) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `bau_fecha` datetime NOT NULL,
  `bau_tomo` int NOT NULL,
  `bau_pagina` int NOT NULL,
  `bau_numero` int NOT NULL,
  `min_id` int NOT NULL,
  `usu_id` int NOT NULL,
  PRIMARY KEY (`bau_id`),
  KEY `min_id_idx` (`min_id`),
  KEY `usu_id_idx` (`usu_id`),
  CONSTRAINT `min_id` FOREIGN KEY (`min_id`) REFERENCES `ministro` (`min_id`),
  CONSTRAINT `usu_id` FOREIGN KEY (`usu_id`) REFERENCES `usuario` (`usus_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bautizado`
--

LOCK TABLES `bautizado` WRITE;
/*!40000 ALTER TABLE `bautizado` DISABLE KEYS */;
/*!40000 ALTER TABLE `bautizado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ministro`
--

DROP TABLE IF EXISTS `ministro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ministro` (
  `min_id` int NOT NULL AUTO_INCREMENT,
  `min_nombre` varchar(45) COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`min_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ministro`
--

LOCK TABLES `ministro` WRITE;
/*!40000 ALTER TABLE `ministro` DISABLE KEYS */;
/*!40000 ALTER TABLE `ministro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `rol_id` int NOT NULL AUTO_INCREMENT,
  `rol_nombre` varchar(50) COLLATE utf8mb3_spanish_ci NOT NULL,
  `rol_permisos` int NOT NULL,
  PRIMARY KEY (`rol_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `usus_id` int NOT NULL AUTO_INCREMENT,
  `usu_usuario` varchar(50) COLLATE utf8mb3_spanish_ci NOT NULL,
  `usu_nombre` varchar(150) COLLATE utf8mb3_spanish_ci NOT NULL,
  `usu_establecimiento` varchar(150) COLLATE utf8mb3_spanish_ci NOT NULL,
  `usu_password` varchar(250) COLLATE utf8mb3_spanish_ci NOT NULL,
  `rol_id` int NOT NULL,
  PRIMARY KEY (`usus_id`),
  KEY `rol_id_idx` (`rol_id`),
  CONSTRAINT `rol_id` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`rol_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-25 13:49:53
