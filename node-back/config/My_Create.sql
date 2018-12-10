CREATE TABLE `Actions` (
	`_id` int NOT NULL AUTO_INCREMENT,
	`Label` varchar(255) NOT NULL,
	`Priority` varchar(255) DEFAULT "Low",
    `File` varchar(255),
    `Campus` varchar(255), 
	`Status` varchar(255) NOT NULL DEFAULT "In progress",
	`Comment` varchar(255),
    `Creator` varchar(255),
	`SysAdminID` int,
	`Closing_Time` varchar(255),
	`ApplicationID` int NOT NULL DEFAULT "0",
	PRIMARY KEY (`_id`)
);

CREATE TABLE `Virtual machines` (
	`_id` int NOT NULL AUTO_INCREMENT,
	`Label` varchar(255) NOT NULL,
    `File` varchar(255),
    `Campus` varchar(255),
	`Comment` varchar(255),
	PRIMARY KEY (`_id`)
);