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

-- Dump completed on 2024-06-03  9:48:15
