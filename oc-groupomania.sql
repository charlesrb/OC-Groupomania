-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: 127.0.0.1    Database: oc-groupomania
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `Comment`
--

DROP TABLE IF EXISTS `Comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `authorId` int NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Comment_postId_fkey` (`postId`),
  KEY `Comment_authorId_fkey` (`authorId`),
  CONSTRAINT `Comment_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comment`
--

LOCK TABLES `Comment` WRITE;
/*!40000 ALTER TABLE `Comment` DISABLE KEYS */;
INSERT INTO `Comment` VALUES (25,'2022-06-14 09:35:17.019','2022-06-14 10:03:38.786','Ceci est un commentaire que j\'ai modifié deux fois !',11,27),(26,'2022-06-16 22:07:58.409','2022-06-16 22:07:58.410','Il faudra donc être sympa avec toi ! ;)',29,28),(27,'2022-06-16 22:08:14.623','2022-06-16 22:08:14.624','Bien joué !',29,27),(28,'2022-06-16 22:12:26.396','2022-06-16 22:12:26.397','Ce serait préférable oui :)',28,28);
/*!40000 ALTER TABLE `Comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Like`
--

DROP TABLE IF EXISTS `Like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Like` (
  `id` int NOT NULL AUTO_INCREMENT,
  `authorId` int NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Like_authorId_fkey_idx` (`authorId`),
  KEY `Like_postId_fkey_idx` (`postId`),
  CONSTRAINT `Like_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Like_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Like`
--

LOCK TABLES `Like` WRITE;
/*!40000 ALTER TABLE `Like` DISABLE KEYS */;
INSERT INTO `Like` VALUES (44,11,26),(47,28,27);
/*!40000 ALTER TABLE `Like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post`
--

DROP TABLE IF EXISTS `Post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `authorId` int NOT NULL,
  `picture` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Post_authorId_fkey` (`authorId`),
  CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post`
--

LOCK TABLES `Post` WRITE;
/*!40000 ALTER TABLE `Post` DISABLE KEYS */;
INSERT INTO `Post` VALUES (25,'2022-06-12 09:03:13.692','2022-06-14 09:51:24.773','Salut les copains !','J\'espère que vous allez bien, moi je m\'éclate à Ibiza !',11,''),(26,'2022-06-12 09:19:34.484','2022-06-12 12:27:38.855','test','test content',11,'http://localhost:8000/images/564px-Jean_de_La_Fontaine1655036858852.jpg'),(27,'2022-06-12 09:22:48.365','2022-06-14 09:34:30.179','Groupe de musique','J\'adore ce groupe de musique trad, ils déchirent !',11,'http://localhost:8000/images/20170129_credit_JulienWieserPhotographe_LaMachine_001_41655199270147.jpg'),(28,'2022-06-16 22:03:24.610','2022-06-16 22:03:24.611','Je débarque sur Groupo ! ','Merci à l\'entreprise Groupomania qui m\'honore en m\'attribuant le grade d\'administrateur du réseau social ! ',28,''),(29,'2022-06-16 22:07:48.053','2022-06-16 22:07:48.054','Hey coucou ! ','Trop heureux d\'avoir rejoint l\'entreprise ! On va bien s\'amuser tous ensemble !',29,'http://localhost:8000/images/happy1655417268044.jpg');
/*!40000 ALTER TABLE `Post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `disabled` tinyint(1) NOT NULL DEFAULT '0',
  `bio` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `picture` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (11,'jean@dupont.fr','$2b$10$UgFeTnXkKzWlHiW5cmltS.ToePHILsFE6dUFinZnZCr9R6BhlWhMO','Dupont','JeanJean',0,'2022-06-05 18:07:16.791','2022-06-16 22:12:45.423',1,'Ceci est la biographie de Jean Dupont','http://localhost:8000/images/john-smith-biography_21655068946023.jpg'),(28,'admin@groupomania.fr','$2b$10$eQppxISyh3yB4.AhBvcFEOjDU8PAwcLFMrFrE1sCO36tVECTvo236','Smith','John',1,'2022-06-16 22:00:45.179','2022-06-16 22:02:07.457',0,'Je suis l\'administrateur de Groupomania. Je supprime des messages et peut même les modifier !','http://localhost:8000/images/tg_group_admins1655416927447.jpg'),(29,'salarie@groupomania.fr','$2b$10$cYh3TJGD6y.Q.T4C1FohzeLvpn9LJe48ueOVdE5hjDq/l7DfWbLcC','Pol','Michel',0,'2022-06-16 22:04:29.349','2022-06-16 22:07:09.739',0,'Je suis un jeune salarié arrivé dans l\'entreprise. Je suis plein d\'enthousiasme !','http://localhost:8000/images/Capture_d’écran_2022-06-17_à_001655417229717.png');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-17  0:13:17
