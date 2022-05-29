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
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('1838295e-db62-486a-91fa-c1631f3b10ea','c85b37c0ac844e2d9f2673397d62ff56a027536bc65c99fb2727d27d5a699548','2022-05-19 11:39:57.277','20220519104402_init',NULL,NULL,'2022-05-19 11:39:57.161',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

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
  UNIQUE KEY `Comment_authorId_key` (`authorId`),
  UNIQUE KEY `Comment_postId_key` (`postId`),
  CONSTRAINT `Comment_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comment`
--

LOCK TABLES `Comment` WRITE;
/*!40000 ALTER TABLE `Comment` DISABLE KEYS */;
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
  `commentId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Like_authorId_key` (`authorId`),
  UNIQUE KEY `Like_postId_key` (`postId`),
  UNIQUE KEY `Like_commentId_key` (`commentId`),
  CONSTRAINT `Like_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Like_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Like_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Like`
--

LOCK TABLES `Like` WRITE;
/*!40000 ALTER TABLE `Like` DISABLE KEYS */;
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
  `updatedAt` datetime(3) DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `authorId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Post_authorId_fkey` (`authorId`),
  CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post`
--

LOCK TABLES `Post` WRITE;
/*!40000 ALTER TABLE `Post` DISABLE KEYS */;
INSERT INTO `Post` VALUES (1,'2022-05-19 15:30:07.818','2022-05-19 15:30:07.819','Ceci est un titre','ceci est du contenu',1),(2,'2022-05-19 15:30:19.542','2022-05-19 15:30:19.542','Ceci est un titre','ceci est du contenu',1),(3,'2022-05-23 00:14:44.449',NULL,'Salut les copains !','J’adore écrire ici !',18),(4,'2022-05-24 09:23:05.973','2022-05-24 09:23:05.974','test','test',18),(5,'2022-05-24 09:23:20.479','2022-05-24 09:23:20.480','test','test',18),(6,'2022-05-24 09:23:44.513','2022-05-24 09:23:44.514','Ca a l\'air de fonctionner !','C\'est génial !',18),(7,'2022-05-24 09:24:14.841','2022-05-24 09:24:14.841','test','test',18),(8,'2022-05-24 09:24:27.040','2022-05-24 09:24:27.040','test','test',18),(9,'2022-05-29 07:51:03.644','2022-05-29 07:51:03.644','Coucou','c\'est moi',27),(10,'2022-05-29 09:28:54.043','2022-05-29 09:28:54.044','Yeah !','C\'est trop bien d\'écrire des trucs !',28),(11,'2022-05-29 17:02:02.965','2022-05-29 17:02:02.966','Coucou les gens !','Je test !',28),(12,'2022-05-29 17:05:40.939','2022-05-29 17:05:40.940','Salut','Salut les gens',31);
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
  `picture` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bio` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'mail@mail.com','$2b$10$SqfTXekeXrUCpeqGdlfeaeg75A2zT2Vp4WiVbO0I2EnUKNByGp66K','Dupont','Jacques','picture','biographie',0,'2022-05-19 15:16:21.425','2022-05-19 15:16:21.427'),(2,'test@test.com','$2b$10$5iy4P6DSgi0wQhRHbetqduH1dBtJhv/9wgpVJGgrs6PVl3rtPRt1K','RB','Charles','','',0,'2022-05-22 15:12:37.503','2022-05-22 15:12:37.504'),(4,'test','$2b$10$V2l1Jhmj1Czw8oo58xmYcOWaAt2Wmao3owT2RBisr.xhu77htXBoK','test','test','','',0,'2022-05-22 15:56:37.818','2022-05-22 15:56:37.819'),(8,'test@mail.com','$2b$10$/1J0n1rDwpDn0VkqmMqPg.BDi8Yh/80zWQny0D1byyRwtEk4RxUK2','test','test','','',0,'2022-05-22 15:57:58.420','2022-05-22 15:57:58.421'),(10,'testtest','$2b$10$wV4NApFqSrWuJGJ6nOLF8.ceojlIdWH/zKMJbuhOSy1cPklGxiw26','test','test','','',0,'2022-05-22 16:00:11.412','2022-05-22 16:00:11.412'),(11,'testtete','$2b$10$dUgawVmNP8hOt/Q9s3lXZ.dRvsVeHh67O8Pr05crx0aWGbOo3dt9y','test','test','','',0,'2022-05-22 16:03:18.071','2022-05-22 16:03:18.071'),(12,'dss','$2b$10$Habtv/I4IBPgK5CSiqMtgeg/EJzhmT2.RI/LozJ0mA0ubyO9R6rnG','sd','sd','','',0,'2022-05-22 16:04:43.140','2022-05-22 16:04:43.140'),(13,'dsfs','$2b$10$H3kYl1kOaqyBQYxnbzlopuLrbr9AN5ceqqdzxBKFw9tD94E2I.wza','sdf','dsf','','',0,'2022-05-22 16:05:51.551','2022-05-22 16:05:51.551'),(18,'','$2b$10$BDNew.SRH7arhZoSOPBvRuTLquBHbx.cUDdRhYiECLWxXpY844hQi','Supprimé','Compte','./upload/avatar-default.jpg','',1,'2022-05-22 16:08:37.860','2022-05-29 09:19:50.474'),(19,'test2','$2b$10$J0eR5ny2U5zwzpht9yVqyOAyr289rlY7EL5/3UFuWzCTdr7jHaUV2','test','test','','',0,'2022-05-22 16:42:37.815','2022-05-22 16:42:37.818'),(22,'testdsfsdf','$2b$10$Q3UNHb6IY2SOG2SqUrGY6OcZCAJfuUua1YMnG12S1Jj5HW.3W03pm','test','test','','',0,'2022-05-22 16:45:32.251','2022-05-22 16:45:32.252'),(23,'charles@mail.com','$2b$10$mB3cdEp8BalWqU6TkLxeB.9oa2LJdju7q/8y0o/FE48.qgsLXy1SO','rb','charles','','',0,'2022-05-22 18:12:38.862','2022-05-22 18:12:38.866'),(24,'charles@charles.com','$2b$10$pDQdpyEeHXu5hyZXcOf/c.eC1/ZA8koA7nKQrGwyECcICDRGNZ9ki','RB','Charles','','',0,'2022-05-22 21:44:47.939','2022-05-22 21:44:47.939'),(25,'test3@test.test','$2b$10$mo7gLtg.8of0aGMwe.j2Y.2qWa4oc3bpf/rQye4.MELrmI3Z1ZQDK','admin2','admin','girafe.jpeg','ceci est ma bio',0,'2022-05-23 13:52:21.215','2022-05-23 13:52:21.217'),(27,'charles@rb.fr','$2b$10$BUIktZl2/KVl4BaDJsAxfeHI5OlzsCZQC/tPaub4JjJ5wwI31FeAy','Supprimé','Compte','','',0,'2022-05-29 07:50:28.837','2022-05-29 09:22:05.269'),(28,'charles@unikum.fr','$2b$10$Mjl2JaEqkSDDVXckk7tYReEm5KGCq4gzBq.w.ue44nV/RRaKOP1yC','Robert','Charles','','Ceci est la super biographie de Charles Robert ! ',0,'2022-05-29 09:22:42.862','2022-05-29 15:34:10.593'),(30,'charles@test.test','$2b$10$9z5VzmT6VP4uogsjSDemAOaYm2lkpenkW.WaIOcY86yM58qsGP1s.','RB','Charles','','',0,'2022-05-29 17:04:05.773','2022-05-29 17:04:05.773'),(31,'test@test.test','$2b$10$lxBKG7O1TxKPdJbNMAtQbOY8MCnaj6a9iA28LS3ZOK5aPGo1q6Fgm','De Niro','Robert','','Ceci est ma bio',0,'2022-05-29 17:04:59.409','2022-05-29 17:11:20.636');
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

-- Dump completed on 2022-05-29 19:31:15
