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
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` text,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `productId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716371574/hxfxigusf2qxwoptr3ea.png','2024-05-22 09:53:29','2024-05-22 09:53:29',1),(2,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716371572/zuahnc7ci6mcu50wyjzj.jpg','2024-05-22 09:53:29','2024-05-22 09:53:29',1),(3,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716371574/zcbkn9bdsblap7tgyo1r.png','2024-05-22 09:53:29','2024-05-22 09:53:29',1),(4,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716371572/hiwgoj8b9t3vqyw4heie.jpg','2024-05-22 09:53:29','2024-05-22 09:53:29',1),(5,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716371578/iygc1rq2gtds3oksj1xw.png','2024-05-22 09:53:29','2024-05-22 09:53:29',1),(6,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716371744/gekzvru7nsgszed3fslj.png','2024-05-22 09:55:44','2024-05-22 09:55:44',2),(7,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716371743/jse6txtgj3aatfrhlmfv.jpg','2024-05-22 09:55:44','2024-05-22 09:55:44',2),(8,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716371744/wmtq12rnvsiqhpokh1zf.png','2024-05-22 09:55:44','2024-05-22 09:55:44',2),(9,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716371743/znldul3easevfviw62mf.jpg','2024-05-22 09:55:44','2024-05-22 09:55:44',2),(10,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716371744/zi94su1vebc6fy3l9x17.png','2024-05-22 09:55:44','2024-05-22 09:55:44',2),(11,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716374148/oqm8caddy8qe9pqiomj3.png','2024-05-22 10:35:52','2024-05-22 10:35:52',3),(12,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716374147/copctp1zm4ckxjgakaqn.jpg','2024-05-22 10:35:52','2024-05-22 10:35:52',3),(13,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716374149/vb8sbwcypvxv8f6cj7gv.png','2024-05-22 10:35:52','2024-05-22 10:35:52',3),(14,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716374147/lmjq0t9nolc4t3eqqeru.jpg','2024-05-22 10:35:52','2024-05-22 10:35:52',3),(15,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716374153/l3wxvfc26rspbjwwjwbb.png','2024-05-22 10:35:52','2024-05-22 10:35:52',3),(36,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716443890/a6y5orslzjrkbdolqln3.jpg','2024-05-23 05:58:15','2024-05-23 05:58:15',9),(37,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716443895/vlduyfndoxtq0nvneyw9.png','2024-05-23 05:58:15','2024-05-23 05:58:15',9),(38,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716443890/ikwqhafhhvlzvl2ruhtd.jpg','2024-05-23 05:58:15','2024-05-23 05:58:15',9),(39,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716443891/dwqnoi8z7hr65tbl2jda.png','2024-05-23 05:58:15','2024-05-23 05:58:15',9),(40,'','2024-05-23 05:58:15','2024-05-23 05:59:44',9),(46,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716465494/ejhlub44nxpwtyf6ksi9.jpg','2024-05-23 12:29:59','2024-05-23 12:29:59',18),(47,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716465559/e3zlexydckiyedyr8tzm.png','2024-05-23 12:29:59','2024-05-23 12:29:59',18),(48,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716465494/ejhlub44nxpwtyf6ksi9.jpg','2024-05-23 12:29:59','2024-05-23 12:29:59',18),(49,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716465559/e3zlexydckiyedyr8tzm.png','2024-05-23 12:29:59','2024-05-23 12:29:59',18),(50,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716465494/ejhlub44nxpwtyf6ksi9.jpg','2024-05-23 12:29:59','2024-05-23 12:29:59',18),(51,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716529554/poix6gflmzfyhc7gmbws.jpg','2024-05-23 12:38:01','2024-05-24 05:46:46',19),(52,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716465559/e3zlexydckiyedyr8tzm.png','2024-05-23 12:38:01','2024-05-23 12:38:01',19),(54,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716529598/pjv8xlu2jiouhui8758j.png','2024-05-23 12:38:01','2024-05-24 05:46:46',19),(60,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716465559/e3zlexydckiyedyr8tzm.png','2024-05-25 15:31:56','2024-05-25 15:31:56',19),(61,'https://res.cloudinary.com/dqoso7erl/image/upload/v1716465494/ejhlub44nxpwtyf6ksi9.jpg','2024-05-25 15:31:56','2024-05-25 15:31:56',19);
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
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
