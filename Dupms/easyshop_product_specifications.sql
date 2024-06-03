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
-- Table structure for table `product_specifications`
--

DROP TABLE IF EXISTS `product_specifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_specifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `value` varchar(20) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `productId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `product_specifications_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_specifications`
--

LOCK TABLES `product_specifications` WRITE;
/*!40000 ALTER TABLE `product_specifications` DISABLE KEYS */;
INSERT INTO `product_specifications` VALUES (1,'Material','100% Cotton','2024-05-22 09:53:29','2024-05-22 09:53:29',1),(2,'Sleeve Length','Short Sleeve','2024-05-22 09:53:29','2024-05-22 09:53:29',1),(3,'Fit','Regular Fit','2024-05-22 09:53:29','2024-05-22 09:53:29',1),(4,'Neckline','Crew Neck','2024-05-22 09:53:29','2024-05-22 09:53:29',1),(5,'Care Instructions','Machine wash at 30°C','2024-05-22 09:53:29','2024-05-22 09:53:29',1),(6,'Material','100% Cotton','2024-05-22 09:55:44','2024-05-22 09:55:44',2),(7,'Sleeve Length','Short Sleeve','2024-05-22 09:55:44','2024-05-22 09:55:44',2),(8,'Fit','Regular Fit','2024-05-22 09:55:44','2024-05-22 09:55:44',2),(9,'Neckline','Crew Neck','2024-05-22 09:55:44','2024-05-22 09:55:44',2),(10,'Care Instructions','Machine wash at 30°C','2024-05-22 09:55:44','2024-05-22 09:55:44',2),(11,'Material','100% Cotton','2024-05-22 10:35:52','2024-05-22 10:35:52',3),(12,'Sleeve Length','Short Sleeve','2024-05-22 10:35:52','2024-05-22 10:35:52',3),(13,'Fit','Regular Fit','2024-05-22 10:35:52','2024-05-22 10:35:52',3),(14,'Neckline','Crew Neck','2024-05-22 10:35:52','2024-05-22 10:35:52',3),(15,'Care Instructions','Machine wash at 30°C','2024-05-22 10:35:52','2024-05-22 10:35:52',3),(41,'Material','100% Cotton','2024-05-23 05:58:16','2024-05-23 05:58:16',9),(42,'Sleeve Length','Short Sleeve','2024-05-23 05:58:16','2024-05-23 05:58:16',9),(43,'Fit','Regular Fit','2024-05-23 05:58:16','2024-05-23 05:58:16',9),(44,'Neckline','Crew Neck','2024-05-23 05:58:16','2024-05-23 05:58:16',9),(45,'Care Instructions','Machine wash at 30°C','2024-05-23 05:58:16','2024-05-23 05:58:16',9),(46,'Material','100% Cotton','2024-05-23 12:29:59','2024-05-23 12:29:59',18),(47,'Sleeve Length','Short Sleeve','2024-05-23 12:29:59','2024-05-23 12:29:59',18),(48,'Fit','Regular Fit','2024-05-23 12:29:59','2024-05-23 12:29:59',18),(49,'Neckline','Crew Neck','2024-05-23 12:29:59','2024-05-23 12:29:59',18),(50,'Care Instructions','Machine wash at 30°C','2024-05-23 12:29:59','2024-05-23 12:29:59',18),(51,'Material','100% Cotton','2024-05-23 12:38:01','2024-05-23 12:38:01',19),(53,'Fit and Fit','Regular Size','2024-05-23 12:38:01','2024-05-24 12:13:14',19),(54,'Care Instructions','Machine wash at 30°C','2024-05-23 12:38:01','2024-05-24 10:33:45',19),(64,'Neckline','Crew Neck','2024-05-25 15:31:56','2024-05-25 15:31:56',19),(65,'Sleeve Length','Short Sleeve','2024-05-25 15:31:56','2024-05-25 15:31:56',19);
/*!40000 ALTER TABLE `product_specifications` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-03  9:48:14
