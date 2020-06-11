CREATE DATABASE cowlist;

USE cowlist;

CREATE TABLE IF NOT EXISTS cows (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(40),
description VARCHAR(255),
PRIMARY KEY (id));

-- should be able to execute this file using: mysql -u root < server/schema.sql