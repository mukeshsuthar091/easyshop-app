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
-- Table structure for table `business`
--

DROP TABLE IF EXISTS `business`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `business` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `business_name` varchar(255) NOT NULL,
  `business_logo` text,
  `category` varchar(255) DEFAULT NULL,
  `sub_category` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `aadhaar_image` text NOT NULL,
  `aadhaar_no` varchar(255) NOT NULL,
  `is_verify` tinyint(1) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `business_ibfk_1` (`userId`),
  CONSTRAINT `business_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `business`
--

LOCK TABLES `business` WRITE;
/*!40000 ALTER TABLE `business` DISABLE KEYS */;
INSERT INTO `business` VALUES (1,3,'Cloths Style','https://res.cloudinary.com/dqoso7erl/image/upload/v1714629049/b0tiqisla1mvayoxsaix.jpg','Cloth','Men','Surat','Gujarat','India','A-404 house','https://res.cloudinary.com/dqoso7erl/image/upload/v1714629049/b0tiqisla1mvayoxsaix.jpg','123456789000',1,'2024-05-10 11:37:33','2024-05-10 11:37:33'),(2,7,'90\'s Cloths','https://res.cloudinary.com/dqoso7erl/image/upload/v1716197649/co4zy45nsoinvplspgrw.jpg','Cloths','Mens Cloth','Surat','Gujarat','India','A-105, Sky Heaven','https://res.cloudinary.com/dqoso7erl/image/upload/v1716197647/j6kwtmar3e6jefohqkiq.jpg','200150649487',NULL,'2024-05-17 10:15:07','2024-05-20 09:34:08'),(3,8,'Cloths Style','https://res.cloudinary.com/dqoso7erl/image/upload/v1715941316/obvchewk9kz1hyc6ldrn.png','Cloths','Women Cloth','Surat','Gujarat','India','A-105, Sky Heaven','https://res.cloudinary.com/dqoso7erl/image/upload/v1715941312/xuwrye1qvj5xrl45lwwa.png','123456789123',NULL,'2024-05-17 10:21:55','2024-05-17 10:21:55'),(4,11,'Cloths Style','https://res.cloudinary.com/dqoso7erl/image/upload/v1717146812/l08ezijdpa5ozvtcmlda.jpg','Cloths','Women Cloth','Surat','Gujarat','India','A-105, Sky Heaven','https://res.cloudinary.com/dqoso7erl/image/upload/v1717146744/qnvt1kkbumpucxeapwmi.jpg','123456789123',NULL,'2024-05-31 09:16:53','2024-05-31 09:16:53');
/*!40000 ALTER TABLE `business` ENABLE KEYS */;
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
