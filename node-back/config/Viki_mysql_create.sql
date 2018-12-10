CREATE TABLE `Users` (
	`_id` int NOT NULL AUTO_INCREMENT,
	`Email` varchar(255) NOT NULL,
	`Password` varchar(255) NOT NULL,
	PRIMARY KEY (`_id`)
);

CREATE TABLE `Privileges` (
	`_id` int NOT NULL AUTO_INCREMENT,
	`Label` varchar(255) NOT NULL,
	`Description` varchar(255) NOT NULL,
	PRIMARY KEY (`_id`)
);

CREATE TABLE `UsersPrivileges` (
	`UserID` int NOT NULL,
	`PrivilegesID` int NOT NULL
);

CREATE TABLE `Actions` (
	`_id` int NOT NULL AUTO_INCREMENT,
	`Label` varchar(255) NOT NULL,
	`Priority` varchar(255) DEFAULT `Low`,
	`Status` varchar(255) NOT NULL DEFAULT `In progress`,
	`Comment` varchar(255),
	`SysAdminID` int,
	`Closing Time` varchar(255),
	`ApplicationID` int NOT NULL DEFAULT `0`,
	PRIMARY KEY (`_id`)
);

CREATE TABLE `Applications` (
	`_id` int NOT NULL AUTO_INCREMENT,
	`Code` varchar(255) NOT NULL,
	`Label` varchar(255) NOT NULL,
	`DomainID` int NOT NULL,
	`CampusID` int NOT NULL,
	PRIMARY KEY (`_id`)
);

CREATE TABLE `Campuses` (
	`_id` int NOT NULL AUTO_INCREMENT,
	`CampusName` varchar(255) NOT NULL,
	PRIMARY KEY (`_id`)
);

CREATE TABLE `Virtual Machines` (
	`_id` int NOT NULL AUTO_INCREMENT,
	`Label` varchar(255) NOT NULL,
	PRIMARY KEY (`_id`)
);

CREATE TABLE `Domains` (
	`_id` int NOT NULL AUTO_INCREMENT,
	`Label` varchar(255) NOT NULL,
	`ParentID` int,
	PRIMARY KEY (`_id`)
);

CREATE TABLE `ApplicationsVM` (
	`ApplicationID` int NOT NULL,
	`MachineID` int NOT NULL
);

CREATE TABLE `Logs` (
	`_id` int NOT NULL AUTO_INCREMENT,
	`UserID` int NOT NULL,
	`ApplicationID` int,
	`Time` varchar(255) NOT NULL,
	`Comment` varchar(255) NOT NULL,
	PRIMARY KEY (`_id`)
);

ALTER TABLE `UsersPrivileges` ADD CONSTRAINT `UsersPrivileges_fk0` FOREIGN KEY (`UserID`) REFERENCES `Users`(`_id`);

ALTER TABLE `UsersPrivileges` ADD CONSTRAINT `UsersPrivileges_fk1` FOREIGN KEY (`PrivilegesID`) REFERENCES `Privileges`(`_id`);

ALTER TABLE `Actions` ADD CONSTRAINT `Actions_fk0` FOREIGN KEY (`SysAdminID`) REFERENCES `Users`(`_id`);

ALTER TABLE `Actions` ADD CONSTRAINT `Actions_fk1` FOREIGN KEY (`ApplicationID`) REFERENCES `Applications`(`_id`);

ALTER TABLE `Applications` ADD CONSTRAINT `Applications_fk0` FOREIGN KEY (`DomainID`) REFERENCES `Domains`(`_id`);

ALTER TABLE `Applications` ADD CONSTRAINT `Applications_fk1` FOREIGN KEY (`CampusID`) REFERENCES `Campuses`(`_id`);


ALTER TABLE `Domains` ADD CONSTRAINT `Domains_fk0` FOREIGN KEY (`ParentID`) REFERENCES `Domains`(`_id`);

ALTER TABLE `ApplicationsVM` ADD CONSTRAINT `ApplicationsVM_fk0` FOREIGN KEY (`ApplicationID`) REFERENCES `Applications`(`_id`);

ALTER TABLE `ApplicationsVM` ADD CONSTRAINT `ApplicationsVM_fk1` FOREIGN KEY (`MachineID`) REFERENCES `Virtual Machines`(`_id`);

ALTER TABLE `Logs` ADD CONSTRAINT `Logs_fk0` FOREIGN KEY (`UserID`) REFERENCES `Users`(`_id`);

ALTER TABLE `Logs` ADD CONSTRAINT `Logs_fk1` FOREIGN KEY (`ApplicationID`) REFERENCES `Applications`(`_id`);

