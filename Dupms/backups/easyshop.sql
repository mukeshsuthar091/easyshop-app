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
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `address` text NOT NULL,
  `address_type` enum('Home','Office','Other') NOT NULL DEFAULT 'Home',
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `city` varchar(20) NOT NULL,
  `state` varchar(20) NOT NULL,
  `country` varchar(20) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `addresses_ibfk_1` (`userId`),
  CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,1,'A-404 Reshma Residency','Home',21.1896,72.7837,'surat','gujarat','india','2024-05-10 11:34:01','2024-05-10 11:34:01'),(2,7,'12, Zeel park','Office',27.4565,82.3133,'surat','gujrat','india','2024-05-20 09:44:18','2024-05-20 09:52:25');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_tokens`
--

DROP TABLE IF EXISTS `app_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `access_token` text,
  `token_type` enum('Bearer') NOT NULL DEFAULT 'Bearer',
  `status` enum('active','expired') NOT NULL DEFAULT 'active',
  `expiry` datetime DEFAULT NULL,
  `access_count` int DEFAULT '0',
  `device_token` text,
  `device_type` tinyint DEFAULT '0' COMMENT '0 = iOS, 1 = Android, 2 = Postman, 3 = Browser',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `app_tokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_tokens`
--

LOCK TABLES `app_tokens` WRITE;
/*!40000 ALTER TABLE `app_tokens` DISABLE KEYS */;
INSERT INTO `app_tokens` VALUES (1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsInVzZXJJZCI6NCwicm9sZSI6MSwicGhvbmUiOjc4Nzg3NzIyOTIsImlhdCI6MTcxNjk3NjI5MCwiZXhwIjoxNzE3MDYyNjkwfQ.P8IfSm6i1oxdMYh7G7tDnb4_40zoMxYZVIJ3xkmlc1U','Bearer','active','2024-05-29 09:51:30',4,NULL,NULL,'2024-05-17 08:38:01','2024-05-29 09:51:30',4),(2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjcsInVzZXJJZCI6Nywicm9sZSI6MiwicGhvbmUiOjc4Nzg3NzIyOTUsImlhdCI6MTcxNzA1MzEwOCwiZXhwIjoxNzE3MTM5NTA4fQ.Ms_rLbgC6UCB0-RzVFPUOPJr36-0l-BF1TPXOu47-V0','Bearer','active','2024-05-30 07:11:48',15,NULL,NULL,'2024-05-17 10:15:07','2024-05-30 07:11:48',7),(3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjgsInVzZXJJZCI6OCwicm9sZSI6MiwicGhvbmUiOjc4Nzg3NzIyNDUsImlhdCI6MTcxNjE4MjQwMSwiZXhwIjoxNzE2MjY4ODAxfQ.bsvjRGzH9YMbvDvYuQS9-w85UV6jATa4Wxbnk4YrEzE','Bearer','active','2024-05-20 05:20:01',4,NULL,NULL,'2024-05-17 10:21:55','2024-05-20 05:20:02',8),(4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJJZCI6Miwicm9sZSI6MSwicGhvbmUiOjc4Nzg3NzIyOTQsImlhdCI6MTcxNzA1MzEzMCwiZXhwIjoxNzE3MTM5NTMwfQ.7DHg6KDWBdWYjoVqsxWItue8B_GYVdX1be3FGelu0Pk','Bearer','active','2024-05-30 07:12:10',4,NULL,0,'2024-05-29 09:58:49','2024-05-30 07:12:10',2),(6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJ1c2VySWQiOjEwLCJyb2xlIjoxLCJwaG9uZSI6Ijc4Nzg3NzIyOTYiLCJpYXQiOjE3MTcxNDU4OTMsImV4cCI6MTcxNzIzMjI5M30.QLPlmSt-pp2cKK6mR7EJwzbODD26VNiwhX6GVhx6sKY','Bearer','active','2024-05-31 08:58:13',1,NULL,NULL,'2024-05-31 08:58:13','2024-05-31 08:58:13',10),(7,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJ1c2VySWQiOjExLCJyb2xlIjoyLCJwaG9uZSI6Ijc4Nzg3NzIyOTciLCJpYXQiOjE3MTcxNDcwMTMsImV4cCI6MTcxNzIzMzQxM30.HCqKmU1LXqp0eMssMZDbTAQsWg4NKIYCs_Z9h3VNP0o','Bearer','active','2024-05-31 09:16:53',1,NULL,NULL,'2024-05-31 09:16:53','2024-05-31 09:16:53',11);
/*!40000 ALTER TABLE `app_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` text NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `productId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `banners_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` VALUES (1,'https://res.cloudinary.com/dqoso7erl/image/upload/v1717136342/dvvwgymakiuc0afbtmhs.png','2024-05-31 06:28:40','2024-05-31 06:28:40',1),(2,'https://res.cloudinary.com/dqoso7erl/image/upload/v1717136342/dvvwgymakiuc0afbtmhs.png','2024-05-31 06:49:30','2024-05-31 06:49:30',2),(3,'https://res.cloudinary.com/dqoso7erl/image/upload/v1717136342/dvvwgymakiuc0afbtmhs.png','2024-05-31 06:49:31','2024-05-31 06:49:31',2);
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `status` enum('ACTIVE','SAVED_FOR_LATER','REMOVED','WISHLIST','ORDERED') DEFAULT 'ACTIVE',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userId` int DEFAULT NULL,
  `b_userId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `productSizeId` int DEFAULT NULL,
  `productColorId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `b_userId` (`b_userId`),
  KEY `productId` (`productId`),
  KEY `productSizeId` (`productSizeId`),
  KEY `productColorId` (`productColorId`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`b_userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cart_ibfk_3` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cart_ibfk_4` FOREIGN KEY (`productSizeId`) REFERENCES `product_sizes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cart_ibfk_5` FOREIGN KEY (`productColorId`) REFERENCES `product_colors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (6,2,'ACTIVE','2024-05-29 11:57:02','2024-05-29 12:01:11',4,7,3,11,13),(7,8,'ACTIVE','2024-05-29 12:02:38','2024-05-29 12:07:34',2,7,1,3,6),(11,3,'ACTIVE','2024-05-30 06:21:15','2024-05-30 07:05:52',2,7,2,7,6),(12,2,'ACTIVE','2024-05-30 06:21:51','2024-05-30 06:21:51',2,7,9,34,43);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` text NOT NULL,
  `title` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `expiry` varchar(255) DEFAULT NULL,
  `is_percentage` tinyint DEFAULT '1',
  `value` float NOT NULL,
  `max_discount` float NOT NULL,
  `min_order_value` float NOT NULL,
  `applicable` int NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favourites`
--

DROP TABLE IF EXISTS `favourites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favourites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `productId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  KEY `userId` (`userId`),
  CONSTRAINT `favourites_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `favourites_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourites`
--

LOCK TABLES `favourites` WRITE;
/*!40000 ALTER TABLE `favourites` DISABLE KEYS */;
/*!40000 ALTER TABLE `favourites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follows`
--

DROP TABLE IF EXISTS `follows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follows` (
  `id` int NOT NULL AUTO_INCREMENT,
  `requested` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `followerId` int DEFAULT NULL,
  `followedId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `followerId` (`followerId`),
  KEY `followedId` (`followedId`),
  CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`followerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`followedId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follows`
--

LOCK TABLES `follows` WRITE;
/*!40000 ALTER TABLE `follows` DISABLE KEYS */;
/*!40000 ALTER TABLE `follows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_products`
--

DROP TABLE IF EXISTS `order_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `rate` float DEFAULT '0',
  `rate_description` text,
  `status` enum('PENDING','ORDERED','PACKED','SHIPPED','DELIVERED','RETURN_REQUESTED','RETURNED') DEFAULT 'PENDING',
  `refund_amount` float DEFAULT '0',
  `return_reason` text,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `orderId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `productColorId` int DEFAULT NULL,
  `productSizeId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  KEY `productId` (`productId`),
  KEY `productColorId` (`productColorId`),
  KEY `productSizeId` (`productSizeId`),
  CONSTRAINT `order_products_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_products_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_products_ibfk_3` FOREIGN KEY (`productColorId`) REFERENCES `product_colors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_products_ibfk_4` FOREIGN KEY (`productSizeId`) REFERENCES `product_sizes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_products`
--

LOCK TABLES `order_products` WRITE;
/*!40000 ALTER TABLE `order_products` DISABLE KEYS */;
INSERT INTO `order_products` VALUES (1,2,0,NULL,'PENDING',0,NULL,'2024-05-30 07:12:44','2024-05-30 07:12:44',2,1,5,2),(2,2,0,NULL,'PENDING',0,NULL,'2024-05-30 07:12:44','2024-05-30 07:12:44',2,2,6,7),(3,2,0,NULL,'PENDING',0,NULL,'2024-05-30 09:32:23','2024-05-30 09:32:23',3,1,5,2),(4,2,0,NULL,'PENDING',0,NULL,'2024-05-30 09:32:23','2024-05-30 09:32:23',3,2,6,7),(5,2,0,NULL,'PENDING',0,NULL,'2024-05-30 12:32:51','2024-05-30 12:32:51',4,1,5,2),(6,2,0,NULL,'PENDING',0,NULL,'2024-05-30 12:32:51','2024-05-30 12:32:51',4,2,6,7),(7,2,0,NULL,'PENDING',0,NULL,'2024-05-30 12:33:17','2024-05-30 12:33:17',5,1,5,2),(8,2,0,NULL,'PENDING',0,NULL,'2024-05-30 12:33:17','2024-05-30 12:33:17',5,2,6,7),(9,2,0,NULL,'PENDING',0,NULL,'2024-05-30 12:35:24','2024-05-30 12:35:24',6,1,5,2),(10,2,0,NULL,'PENDING',0,NULL,'2024-05-30 12:35:24','2024-05-30 12:35:24',6,9,42,35),(11,2,0,NULL,'PENDING',0,NULL,'2024-05-30 12:38:53','2024-05-30 12:38:53',7,1,5,2),(12,2,0,NULL,'PENDING',0,NULL,'2024-05-30 12:38:53','2024-05-30 12:38:53',7,9,42,35);
/*!40000 ALTER TABLE `order_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `payment_method` enum('COD','ONLINE') DEFAULT 'COD',
  `promo_discount` float DEFAULT '0',
  `delivery_charge` float DEFAULT '0',
  `sub_total` float NOT NULL,
  `total_amount` float NOT NULL,
  `status` enum('PENDING','ORDERED','PACKED','SHIPPED','DELIVERED','CANCELLED','PARTIAL_RETURN_REQUESTED','RETURN_REQUESTED','PARTIAL_RETURNED','RETURNED','ACCEPTED','REJECTED') DEFAULT 'PENDING',
  `cancellation_reason` text,
  `refund_amount` float DEFAULT '0',
  `return_reason` text,
  `reject_reason` text,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `couponId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `addressId` int DEFAULT NULL,
  `b_userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `couponId` (`couponId`),
  KEY `userId` (`userId`),
  KEY `addressId` (`addressId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`couponId`) REFERENCES `coupons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`addressId`) REFERENCES `addresses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'ONLINE',0,20,520,500,'ACCEPTED',NULL,0,'','We are too busy to take new orders.','2024-05-27 13:44:19','2024-05-30 09:30:48',NULL,2,1,7),(2,'COD',0,30,578,528,'PENDING',NULL,0,NULL,NULL,'2024-05-30 07:12:44','2024-05-30 09:30:48',NULL,2,1,7),(3,'COD',0,30,578,528,'PENDING',NULL,0,NULL,NULL,'2024-05-30 09:32:23','2024-05-30 09:32:23',NULL,2,1,7),(4,'COD',0,30,578,528,'PENDING',NULL,0,NULL,NULL,'2024-05-30 12:32:51','2024-05-30 12:32:51',NULL,2,1,7),(5,'COD',0,30,578,528,'PENDING',NULL,0,NULL,NULL,'2024-05-30 12:33:17','2024-05-30 12:33:17',NULL,2,1,7),(6,'COD',0,30,578,528,'PENDING',NULL,0,NULL,NULL,'2024-05-30 12:35:24','2024-05-30 12:35:24',NULL,2,1,7),(7,'COD',0,30,578,528,'PENDING',NULL,0,NULL,NULL,'2024-05-30 12:38:53','2024-05-30 12:38:53',NULL,2,1,7);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` enum('COD','ONLINE') DEFAULT 'COD',
  `transaction_id` varchar(255) DEFAULT NULL,
  `paymentIntent` text,
  `client_secret` text,
  `ephemeral_key` text,
  `customer_id` text,
  `refund_id` text,
  `refund_amount` float NOT NULL,
  `balance_transaction` text,
  `amount` float NOT NULL,
  `charge` text,
  `status` enum('PENDING','SUCCESS','FAILED','REFUNDED') DEFAULT 'PENDING',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userId` int DEFAULT NULL,
  `orderId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `orderId` (`orderId`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_colors`
--

DROP TABLE IF EXISTS `product_colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_colors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `color` varchar(20) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `productId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `product_colors_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_colors`
--

LOCK TABLES `product_colors` WRITE;
/*!40000 ALTER TABLE `product_colors` DISABLE KEYS */;
INSERT INTO `product_colors` VALUES (1,'Red','2024-05-22 09:53:29','2024-05-22 09:53:29',1),(2,'Blue','2024-05-22 09:53:29','2024-05-22 09:53:29',1),(3,'Green','2024-05-22 09:53:29','2024-05-22 09:53:29',1),(4,'Black','2024-05-22 09:53:29','2024-05-22 09:53:29',1),(5,'White','2024-05-22 09:53:29','2024-05-22 09:53:29',1),(6,'Red','2024-05-22 09:55:44','2024-05-22 09:55:44',2),(7,'Blue','2024-05-22 09:55:44','2024-05-22 09:55:44',2),(8,'Green','2024-05-22 09:55:44','2024-05-22 09:55:44',2),(9,'Black','2024-05-22 09:55:44','2024-05-22 09:55:44',2),(10,'White','2024-05-22 09:55:44','2024-05-22 09:55:44',2),(11,'Red','2024-05-22 10:35:52','2024-05-22 10:35:52',3),(12,'Blue','2024-05-22 10:35:52','2024-05-22 10:35:52',3),(13,'Green','2024-05-22 10:35:52','2024-05-22 10:35:52',3),(14,'Black','2024-05-22 10:35:52','2024-05-22 10:35:52',3),(15,'White','2024-05-22 10:35:52','2024-05-22 10:35:52',3),(41,'Red','2024-05-23 05:58:16','2024-05-23 05:58:16',9),(42,'Blue','2024-05-23 05:58:16','2024-05-23 05:58:16',9),(43,'Green','2024-05-23 05:58:16','2024-05-23 05:58:16',9),(44,'Black','2024-05-23 05:58:16','2024-05-23 05:58:16',9),(45,'White','2024-05-23 05:58:16','2024-05-23 05:58:16',9),(46,'Red','2024-05-23 12:29:59','2024-05-23 12:29:59',18),(47,'Blue','2024-05-23 12:29:59','2024-05-23 12:29:59',18),(48,'Green','2024-05-23 12:29:59','2024-05-23 12:29:59',18),(49,'Black','2024-05-23 12:29:59','2024-05-23 12:29:59',18),(50,'White','2024-05-23 12:29:59','2024-05-23 12:29:59',18),(51,'Red','2024-05-23 12:38:01','2024-05-23 12:38:01',19),(53,'Dark Green','2024-05-23 12:38:01','2024-05-24 11:40:13',19),(54,'White','2024-05-23 12:38:01','2024-05-24 11:40:13',19),(60,'Gray','2024-05-25 15:31:56','2024-05-25 15:31:56',19),(61,'Yellow','2024-05-25 15:31:56','2024-05-25 15:31:56',19);
/*!40000 ALTER TABLE `product_colors` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Table structure for table `product_sizes`
--

DROP TABLE IF EXISTS `product_sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_sizes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `size` varchar(20) NOT NULL,
  `price` float NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `productId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `product_sizes_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_sizes`
--

LOCK TABLES `product_sizes` WRITE;
/*!40000 ALTER TABLE `product_sizes` DISABLE KEYS */;
INSERT INTO `product_sizes` VALUES (1,'Small',399,'2024-05-22 09:53:29','2024-05-22 09:53:29',1),(2,'Medium',499,'2024-05-22 09:53:29','2024-05-22 09:53:29',1),(3,'Large',599,'2024-05-22 09:53:29','2024-05-22 09:53:29',1),(4,'X-Large',749,'2024-05-22 09:53:29','2024-05-22 09:53:29',1),(5,'Small',399,'2024-05-22 09:55:44','2024-05-22 09:55:44',2),(6,'Medium',499,'2024-05-22 09:55:44','2024-05-22 09:55:44',2),(7,'Large',599,'2024-05-22 09:55:44','2024-05-22 09:55:44',2),(8,'X-Large',749,'2024-05-22 09:55:44','2024-05-22 09:55:44',2),(9,'Small',399,'2024-05-22 10:35:52','2024-05-22 10:35:52',3),(10,'Medium',499,'2024-05-22 10:35:52','2024-05-22 10:35:52',3),(11,'Large',599,'2024-05-22 10:35:52','2024-05-22 10:35:52',3),(12,'X-Large',749,'2024-05-22 10:35:52','2024-05-22 10:35:52',3),(33,'Small',399,'2024-05-23 05:58:16','2024-05-23 05:58:16',9),(34,'Medium',499,'2024-05-23 05:58:16','2024-05-23 05:58:16',9),(35,'Large',599,'2024-05-23 05:58:16','2024-05-23 05:58:16',9),(36,'X-Large',749,'2024-05-23 05:58:16','2024-05-23 05:58:16',9),(37,'Small',399,'2024-05-23 12:29:59','2024-05-23 12:29:59',18),(38,'Medium',499,'2024-05-23 12:29:59','2024-05-23 12:29:59',18),(39,'Large',599,'2024-05-23 12:29:59','2024-05-23 12:29:59',18),(40,'X-Large',749,'2024-05-23 12:29:59','2024-05-23 12:29:59',18),(54,'Small',399,'2024-05-24 11:21:51','2024-05-25 15:28:05',19),(55,'M',469,'2024-05-24 11:27:04','2024-05-25 15:28:05',19),(56,'L',579,'2024-05-24 11:27:04','2024-05-25 15:28:05',19),(59,'XL',749,'2024-05-25 15:31:56','2024-05-25 15:31:56',19);
/*!40000 ALTER TABLE `product_sizes` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Table structure for table `reward_points`
--

DROP TABLE IF EXISTS `reward_points`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reward_points` (
  `id` int NOT NULL AUTO_INCREMENT,
  `points` int NOT NULL DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userId` int DEFAULT NULL,
  `creatorId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `creatorId` (`creatorId`),
  CONSTRAINT `reward_points_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reward_points_ibfk_2` FOREIGN KEY (`creatorId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reward_points`
--

LOCK TABLES `reward_points` WRITE;
/*!40000 ALTER TABLE `reward_points` DISABLE KEYS */;
/*!40000 ALTER TABLE `reward_points` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_categories`
--

DROP TABLE IF EXISTS `sub_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `image` text,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userId` int NOT NULL,
  `categoryId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sub_categories_ibfk_1` (`userId`),
  KEY `sub_categories_ibfk_2` (`categoryId`),
  CONSTRAINT `sub_categories_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sub_categories_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_categories`
--

LOCK TABLES `sub_categories` WRITE;
/*!40000 ALTER TABLE `sub_categories` DISABLE KEYS */;
INSERT INTO `sub_categories` VALUES (1,'Mobile Phones','https://res.cloudinary.com/dqoso7erl/image/upload/v1716275878/atoawqd2tszu3pfirrca.jpg','2024-05-21 07:17:58','2024-05-21 07:20:50',7,1),(2,'Fiction','https://res.cloudinary.com/dqoso7erl/image/upload/v1716276003/p6urjwjzoor97yvc5imd.jpg','2024-05-21 07:20:03','2024-05-21 07:20:03',7,2),(4,'Laptops','https://res.cloudinary.com/dqoso7erl/image/upload/v1716276584/qj9p1blxf0ypix9ttblu.jpg','2024-05-21 07:29:44','2024-05-21 07:30:20',7,1),(5,'Men Clothing','https://res.cloudinary.com/dqoso7erl/image/upload/v1716292108/ycsigbbyrn4emcxbutx4.jpg','2024-05-21 10:29:14','2024-05-21 11:48:28',7,4),(8,'Kitchen Appliances','https://res.cloudinary.com/dqoso7erl/image/upload/v1716293978/vuh268fxky8lysnoghdf.jpg','2024-05-21 12:19:38','2024-05-21 12:19:38',7,5),(11,'Non fiction','https://res.cloudinary.com/dqoso7erl/image/upload/v1716464136/q3u3pqijchzp4vecmnor.jpg','2024-05-23 11:20:11','2024-05-23 11:36:15',7,5);
/*!40000 ALTER TABLE `sub_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_coupons`
--

DROP TABLE IF EXISTS `user_coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_coupons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `use_count` int DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `couponId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `couponId` (`couponId`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_coupons_ibfk_1` FOREIGN KEY (`couponId`) REFERENCES `coupons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_coupons_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_coupons`
--

LOCK TABLES `user_coupons` WRITE;
/*!40000 ALTER TABLE `user_coupons` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` int NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `image` text,
  `country_code` varchar(5) NOT NULL,
  `phone` bigint NOT NULL,
  `reward_points` int NOT NULL DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'pradip','patel','pradip@gmail.com','$argon2id$v=19$m=4096,t=3,p=1$m2IPpibOtXKZy/T56118gA$OmJUL+8VxHBP4Kcj4/BdQ51LlBOMUfaFTYsy9W17RJE','https://res.cloudinary.com/dqoso7erl/image/upload/v1714628402/upaakop2eeavmyfmeyzr.jpg','+91',7878772299,0,'2024-05-02 05:40:02','2024-05-02 05:40:02'),(2,1,'mukesh','suthar','mukesh@gmail.com','$argon2id$v=19$m=4096,t=3,p=1$p4anjOM6u/aNENIaD8RWEA$LDtYFMWB+3QGFB2ZF9yH9m+eR+sAyi7sxruXSODt/kI','https://res.cloudinary.com/dqoso7erl/image/upload/v1714628836/ublfuaxoka5ewzt9mnkc.jpg','+91',7878772294,0,'2024-05-02 05:47:16','2024-05-02 05:47:16'),(3,2,'rohit','sharma','rohit@gmail.com','$argon2id$v=19$m=4096,t=3,p=1$ApBjzY2lCLEd1d5z5Klohw$dNmzqAx3bSbAzqMpV1N+Pm9NuRq9u/vKiPbLlwgRLLs','https://res.cloudinary.com/dqoso7erl/image/upload/v1714629049/b0tiqisla1mvayoxsaix.jpg','+91',7878772291,0,'2024-05-02 05:50:49','2024-05-09 09:45:36'),(4,1,'raviraj','joshi','ravi@gmail.com','$argon2id$v=19$m=4096,t=3,p=1$EN8hCs7UVJstRgPkLcDolg$5KwVZFC8tzJp7LcPHebBkdTpn4KjOUx0Tyd/VXFHXcU','https://res.cloudinary.com/dqoso7erl/image/upload/v1716195012/rx11vi3h5ezxwerljyw3.jpg','+91',7878772292,0,'2024-05-17 08:38:01','2024-05-20 08:50:11'),(7,2,'ravi','prajapati','ravi@gmail.com','$argon2id$v=19$m=4096,t=3,p=1$NAgIgNqMHXaDWeVHowl/Pg$RB7TDLGesdXGIKjM9dUMb/VmBR8tFIc7Jpg/m6EDKAM','https://res.cloudinary.com/dqoso7erl/image/upload/v1716197645/iir0jblotds6rbwqgvhp.jpg','+91',7878772295,0,'2024-05-17 10:15:07','2024-05-20 09:34:03'),(8,2,'Dhruvin','patel','dhruvin@gmail.com','$argon2id$v=19$m=4096,t=3,p=1$01aNygyYkdb7eKJ2KizI0w$5NEJOF2P0jN4HYzAhrNbVf9SXEHLwNWt9z931bAIm1A','https://res.cloudinary.com/dqoso7erl/image/upload/v1715941307/vjbxh3hyven0imnt7ikm.jpg','+91',7878772245,0,'2024-05-17 10:21:55','2024-05-17 11:11:39'),(10,1,'darshan','shan','darshan@gmail.com','$argon2id$v=19$m=4096,t=3,p=1$HtL5r6ANPWXMcLCslBH/Xw$gBAyvyWMdQH2kaE4A2JYgTtgaDLCPObYVe/bAUpPQy4','https://res.cloudinary.com/dqoso7erl/image/upload/v1717145284/kg1aqp0kbqiuqidrgtnr.jpg','+91',7878772296,0,'2024-05-31 08:58:12','2024-05-31 08:58:12'),(11,2,'Dhaval','patel','dhaval@gmail.com','$argon2id$v=19$m=4096,t=3,p=1$O7gEMnZ9IQWr1wO9sMXIkA$hF/STGLgAZLa/8owj4cFWGf9YbJ5Xo3zZGFqUGwxWGg','https://res.cloudinary.com/dqoso7erl/image/upload/v1717146660/sgovtxxe8eyocidtww5k.jpg','+91',7878772297,0,'2024-05-31 09:16:53','2024-05-31 09:16:53');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-03  9:49:20
