ALTER USER 'root'@'%' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
FLUSH PRIVILEGES;

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

CREATE VIEW activity_revenue AS
    SELECT 
        a.id AS activity_id,
        a.description AS activity_description,
        (a.cost * COUNT(cs.student_id) + IFNULL(SUM(e.cost), 0)) AS total_revenue
    FROM 
        activity a
    LEFT JOIN 
        class c ON a.id = c.activity_id
    LEFT JOIN 
        class_student cs ON c.id = cs.class_id
    LEFT JOIN 
        equipment e ON cs.equipment_id = e.id
    GROUP BY 
        a.id
    ORDER BY 
        total_revenue DESC;


CREATE VIEW student_activity AS
    SELECT
        a.id AS activity_id,
        a.description AS activity_description,
        COUNT(cs.student_id) AS total_students
    FROM 
        activity a
    JOIN
        class c ON a.id = c.activity_id
    JOIN
        class_student cs ON c.id = cs.class_id
    GROUP BY
        a.id
    ORDER BY
        total_students DESC;

CREATE VIEW shift_class AS
    SELECT
        s.id AS shift_id,
        s.name AS shift_name,
        COUNT(c.id) AS total_classes
    FROM
        shift s
    JOIN    
        class c ON s.id = c.shift_id
    GROUP BY
        s.id
    ORDER BY
        total_classes DESC;

CREATE VIEW class_props AS
    SELECT
        c.dictated AS dictated,
        c.student_quotas AS student_quotas,
        i.first_name AS instructor,
        s.name AS shift,
        a.description AS activity
        FROM
            class c
        JOIN
            instructor i ON c.instructor_id = i.id
        JOIN
            shift s ON c.shift_id = s.id
        JOIN
            activity a ON c.activity_id = a.id;