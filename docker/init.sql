CREATE TABLE `activity` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `description` VARCHAR(255) NULL DEFAULT 'undefined',
    `cost` BIGINT UNSIGNED NOT NULL,
    `min_age` TINYINT UNSIGNED NULL DEFAULT 0,
    `max_age` TINYINT UNSIGNED NULL DEFAULT 100
);

CREATE TABLE `shift` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(25) NOT NULL,
    `start_time` TIME NOT NULL,
    `end_time` TIME NOT NULL
);

CREATE TABLE `instructor` (
    `id` VARCHAR(9) NOT NULL PRIMARY KEY UNIQUE,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL
);

CREATE TABLE `class` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `dictated` BOOLEAN NOT NULL,
    `instructor_id` VARCHAR(9) NOT NULL,
    `shift_id` SMALLINT UNSIGNED NOT NULL,
    `activity_id` SMALLINT UNSIGNED NOT NULL,
    `student_quotas` TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY (`shift_id`) REFERENCES `shift`(`id`),
    FOREIGN KEY (`activity_id`) REFERENCES `activity`(`id`),
    FOREIGN KEY (`instructor_id`) REFERENCES `instructor`(`id`),
    UNIQUE KEY `instructor_shift` (`instructor_id`, `shift_id`)
);

CREATE TABLE `login` (
    `mail` VARCHAR(100) NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    PRIMARY KEY (`mail`)
);

CREATE TABLE `student` (
    `id` VARCHAR(9) NOT NULL UNIQUE,
    `mail` VARCHAR(100) NOT NULL,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `birth_day` DATE NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `mail` (`mail`)
);

CREATE TABLE `equipment` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `activity_id` SMALLINT UNSIGNED NOT NULL,
    `description` VARCHAR(255) NULL DEFAULT 'undefined',
    `cost` BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (`activity_id`) REFERENCES `activity`(`id`)
);

CREATE TABLE `class_student` (
    `class_id` SMALLINT UNSIGNED NOT NULL,
    `student_id` VARCHAR(9) NOT NULL,
    `equipment_id` SMALLINT UNSIGNED NULL,
    PRIMARY KEY (`class_id`, `student_id`),
    FOREIGN KEY (`class_id`) REFERENCES `class`(`id`),
    FOREIGN KEY (`student_id`) REFERENCES `student`(`id`),
    FOREIGN KEY (`equipment_id`) REFERENCES `equipment`(`id`)
);
