CREATE DATABASE  IF NOT EXISTS `easyshop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `easyshop`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: easyshop
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `image` text,
  `type` varchar(20) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Electronics','https://res.cloudinary.com/dqoso7erl/image/upload/v1716270804/eyi0aqcm2r0073ua3req.avif','Gadgets','2024-05-21 05:53:24','2024-05-21 05:53:24',7),(2,'Books','https://res.cloudinary.com/dqoso7erl/image/upload/v1716270937/oxvoo6whefgc9vbofibd.jpg','Education','2024-05-21 05:55:37','2024-05-21 05:55:37',7),(3,'Book','https://res.cloudinary.com/dqoso7erl/image/upload/v1716290538/qpegtqdnkmpexudqhpxf.jpg','Entertainment','2024-05-21 05:55:46','2024-05-21 11:22:18',7),(4,'Clothing','https://res.cloudinary.com/dqoso7erl/image/upload/v1716271034/ddke2wnjzdflgxurtroq.png','Fashion','2024-05-21 05:57:14','2024-05-21 05:57:14',7),(5,'Home Appliances','https://res.cloudinary.com/dqoso7erl/image/upload/v1716271231/hxcc3oszeeftbxlksosj.jpg','Household','2024-05-21 06:00:30','2024-05-21 06:00:30',7),(6,'Sports Equipment','https://res.cloudinary.com/dqoso7erl/image/upload/v1716285481/q85ue1xybdavdakb88fp.jpg','Fitness','2024-05-21 09:58:04','2024-05-21 09:58:04',7),(10,'Footwear','https://res.cloudinary.com/dqoso7erl/image/upload/v1716458538/zw7t79h4hfu3w6g9iw6x.jpg','Shoes','2024-05-23 10:03:47','2024-05-23 10:03:47',7),(11,'Footwear 45454','https://res.cloudinary.com/dqoso7erl/image/upload/v1716462867/hoeohet2o1qjfmo4uuyj.png','Shoes 454','2024-05-23 10:09:06','2024-05-23 11:15:30',7);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-03  9:48:15
