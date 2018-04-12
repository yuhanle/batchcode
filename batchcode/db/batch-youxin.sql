/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50721
 Source Host           : localhost:3306
 Source Schema         : batch-youxin

 Target Server Type    : MySQL
 Target Server Version : 50721
 File Encoding         : 65001

 Date: 16/03/2018 14:13:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tb_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `phone` text NOT NULL,
  `user_name` text,
  `user_type` tinyint(1) DEFAULT NULL,
  `password` text NOT NULL,
  `sex` tinyint(1) DEFAULT NULL,
  `roots` text,
  `head_url` text,
  `birthday` bigint(20) DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `version` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`phone`(11)) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_user
-- ----------------------------
BEGIN;
INSERT INTO `tb_user` VALUES (1, '13373911572', '其窕', 1, '111111', 2, '北京市 - 东城区', 'http:\\/\\/139.196.221.160\\/media\\/pics\\/15211074845aaa421ccc2f7', 1521105315, 1521105315747, 1521105315747, 0);
INSERT INTO `tb_user` VALUES (2, '13373911573', '吕玲', 1, 'ai39nff5t94', 3, '北京市 - 东城区', 'http:\\/\\/139.196.221.160\\/media\\/pics\\/15211074845aaa421ccc2f7', 1521105330, 1521105330256, 1521105330256, 0);
INSERT INTO `tb_user` VALUES (3, '13373911574', '裘宛', 1, 'hadnyqq6ggs', 3, '北京市 - 东城区', 'http:\\/\\/139.196.221.160\\/media\\/pics\\/15211074845aaa421ccc2f7', 1521105390, 1521105390172, 1521105390172, 0);
INSERT INTO `tb_user` VALUES (4, '13373911575', '郎掌清鸿', 1, 'gtxy4gd6c19', 3, '北京市 - 东城区', 'http:\\/\\/139.196.221.160\\/media\\/pics\\/15211074845aaa421ccc2f7', 1521105450, 1521105450212, 1521105450212, 0);
INSERT INTO `tb_user` VALUES (5, '13373911576', '弓翻谘', 1, 'od7l2xcafnb', 3, '北京市 - 东城区', 'http:\\/\\/139.196.221.160\\/media\\/pics\\/15211074845aaa421ccc2f7', 1521105510, 1521105510164, 1521105510164, 0);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
