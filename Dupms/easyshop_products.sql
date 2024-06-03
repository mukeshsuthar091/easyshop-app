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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `additional_info` text,
  `additional_details` text,
  `order_count` int DEFAULT '0',
  `rate_avg` float DEFAULT '0',
  `rate_count` int DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userId` int DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `subCategoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `categoryId` (`categoryId`),
  KEY `subCategoryId` (`subCategoryId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`subCategoryId`) REFERENCES `sub_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Color Short T-shirt ','This is a nice cloths','Made from 100% cotton, comfortable and breathable, perfect for casual wear.','Machine washable, available in various colors and sizes.',4,0,0,'2024-05-22 09:53:29','2024-05-30 12:38:53',7,4,5),(2,'Jeans Shirt','This Jeans shirt is very nice and the material is also good.','Made from 100% cotton, comfortable and breathable, perfect for casual wear.','Machine washable, available in various colors and sizes.',2,0,0,'2024-05-22 09:55:44','2024-05-30 12:33:17',7,4,5),(3,'Checks Shirt ','Elevate your wardrobe with our timeless Classic Checkered Shirt, a perfect blend of style, comfort, and versatility. ','Made from 100% cotton, comfortable and breathable, perfect for casual wear.','Machine washable, available in various colors and sizes.',0,0,0,'2024-05-22 10:35:52','2024-05-22 10:35:52',7,4,5),(9,'Jeans Shirt','Elevate your wardrobe with our timeless Classic Checkered Shirt, a perfect blend of style, comfort, and versatility. ','Made from 100% cotton, comfortable and breathable, perfect for casual wear.','Machine washable, available in various colors and sizes.',2,0,0,'2024-05-23 05:58:15','2024-05-30 12:38:53',7,4,5),(18,'Jeans Shirt','Elevate your wardrobe with our timeless Classic Checkered Shirt, a perfect blend of style, comfort, and versatility.','Made from 100% cotton, comfortable and breathable, perfect for casual wear.','Machine washable, available in various colors and sizes.',0,0,0,'2024-05-23 12:29:59','2024-05-23 12:29:59',7,4,5),(19,'Cuban Collar Shirt','The Cuban Collar shirt is a specific type of short-sleeved shirt with, of course, a Cuban-style open collar.','Made from 100% cotton, comfortable and breathable, perfect for casual wear.','Machine washable, available in various colors and sizes.',0,0,0,'2024-05-23 12:38:01','2024-05-25 15:31:54',7,4,5);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-03  9:48:16
