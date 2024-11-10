CREATE TABLE `activities` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `description` VARCHAR(255) NULL DEFAULT 'undefined',
    `cost` BIGINT UNSIGNED NOT NULL,
    `min_age` TINYINT UNSIGNED NULL DEFAULT 0,
    `max_age` TINYINT UNSIGNED NULL DEFAULT 100
);

CREATE TABLE `shifts` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `start_time` TIME NOT NULL,
    `end_time` TIME NOT NULL
);

CREATE TABLE `instructors` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL
);

CREATE TABLE `class` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `dictated` BOOLEAN NOT NULL,
    `instructor_id` SMALLINT UNSIGNED NOT NULL,
    `shift_id` SMALLINT UNSIGNED NOT NULL,
    `activity_id` SMALLINT UNSIGNED NOT NULL,
    `student_quotas` TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY (`shift_id`) REFERENCES `shifts`(`id`),
    FOREIGN KEY (`activity_id`) REFERENCES `activities`(`id`),
    FOREIGN KEY (`instructor_id`) REFERENCES `instructors`(`id`),
    UNIQUE KEY `instructor_shift` (`instructor_id`, `shift_id`)
);

CREATE TABLE `login` (
    `mail` VARCHAR(100) NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    PRIMARY KEY (`mail`)
);

CREATE TABLE `students` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `birth_day` DATE NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `mail` VARCHAR(100) NOT NULL
);

CREATE TABLE `equipment` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `activity_id` SMALLINT UNSIGNED NOT NULL,
    `description` VARCHAR(255) NULL DEFAULT 'undefined',
    `cost` BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (`activity_id`) REFERENCES `activities`(`id`)
);

CREATE TABLE `class_student` (
    `class_id` SMALLINT UNSIGNED NOT NULL,
    `student_id` SMALLINT UNSIGNED NOT NULL,
    `equipment_id` SMALLINT UNSIGNED NULL,
    PRIMARY KEY (`class_id`, `student_id`),
    FOREIGN KEY (`class_id`) REFERENCES `class`(`id`),
    FOREIGN KEY (`student_id`) REFERENCES `students`(`id`),
    FOREIGN KEY (`equipment_id`) REFERENCES `equipment`(`id`)
);
