CREATE TABLE `users`(
    `_id` INT NOT NULL AUTO_INCREMENT,
    `mail` VARCHAR(255),
    PRIMARY KEY(`_id`)
);
CREATE TABLE `privileges`(
    `_id` INT NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`_id`)
);
CREATE TABLE `usersPrivileges`(
    `userId` INT NOT NULL,
    `privilegesId` INT NOT NULL
);
CREATE TABLE `actions`(
    `_id` INT NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(255) NOT NULL,
    `priority` VARCHAR(255),
    `file` VARCHAR(255),
    `status` VARCHAR(255) NOT NULL DEFAULT "In progress",
    `comment` VARCHAR(255),
    `creatorId` INT,
    `actionTakerId` INT,
    `closingTime` VARCHAR(255),
    `applicationId` INT NOT NULL,
    PRIMARY KEY(`_id`)
);
CREATE TABLE `applications`(
    `_id` INT NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(255) NOT NULL,
    `campus` VARCHAR(255),
    `comment` VARCHAR(255),
    `domainId` INT NOT NULL,
    PRIMARY KEY(`_id`)
);
CREATE TABLE `campuses`(
    `_id` INT NOT NULL AUTO_INCREMENT,
    `campusName` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`_id`)
);
CREATE TABLE `virtualMachines`(
    `_id` INT NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(255) NOT NULL,
    `filePath` VARCHAR(255),
    `campus` VARCHAR(255),
    `comment` VARCHAR(255),
    PRIMARY KEY(`_id`)
);
CREATE TABLE `domains`(
    `_id` INT NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(255) NOT NULL,
    `parentId` INT,
    PRIMARY KEY(`_id`)
);
CREATE TABLE `applicationsVm`(
    `applicationId` INT NOT NULL,
    `machineId` INT NOT NULL
);
CREATE TABLE `logs`(
    `_id` INT NOT NULL AUTO_INCREMENT,
    `userId` INT NOT NULL,
    `applicationId` INT,
    `time` VARCHAR(255) NOT NULL,
    `comment` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`_id`)
);
ALTER TABLE
    `usersPrivileges` ADD CONSTRAINT `usersPrivileges_fk0` FOREIGN KEY(`userID`) REFERENCES `users`(`_id`);
ALTER TABLE
    `usersPrivileges` ADD CONSTRAINT `usersPrivileges_fk1` FOREIGN KEY(`privilegesId`) REFERENCES `privileges`(`_id`);
ALTER TABLE
    `actions` ADD CONSTRAINT `actions_fk0` FOREIGN KEY(`creatorId`) REFERENCES `users`(`_id`);
ALTER TABLE
    `actions` ADD CONSTRAINT `actions_fk1` FOREIGN KEY(`applicationId`) REFERENCES `applications`(`_id`);
ALTER TABLE
    `applications` ADD CONSTRAINT `applications_fk0` FOREIGN KEY(`domainId`) REFERENCES `domains`(`_id`);
ALTER TABLE
    `domains` ADD CONSTRAINT `domains_fk0` FOREIGN KEY(`parentId`) REFERENCES `domains`(`_id`);
ALTER TABLE
    `applicationsVm` ADD CONSTRAINT `applicationsVm_fk0` FOREIGN KEY(`applicationId`) REFERENCES `applications`(`_id`);
ALTER TABLE
    `applicationsVm` ADD CONSTRAINT `applicationsVm_fk1` FOREIGN KEY(`machineId`) REFERENCES `virtualMachines`(`_id`);
ALTER TABLE
    `logs` ADD CONSTRAINT `logs_fk0` FOREIGN KEY(`userId`) REFERENCES `users`(`_id`);
ALTER TABLE
    `logs` ADD CONSTRAINT `logs_fk1` FOREIGN KEY(`applicationId`) REFERENCES `applications`(`_id`);