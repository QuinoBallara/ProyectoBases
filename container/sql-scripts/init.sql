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
    `id` VARCHAR(8) NOT NULL PRIMARY KEY UNIQUE,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL
);

CREATE TABLE `class` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `dictated` BOOLEAN NOT NULL,
    `instructor_id` VARCHAR(8) NOT NULL,
    `shift_id` SMALLINT UNSIGNED NOT NULL,
    `activity_id` SMALLINT UNSIGNED NOT NULL,
    `student_quotas` TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY (`shift_id`) REFERENCES `shift`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`activity_id`) REFERENCES `activity`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`instructor_id`) REFERENCES `instructor`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `instructor_shift` (`instructor_id`, `shift_id`)
);

CREATE TABLE `login` (
    `mail` VARCHAR(100) NOT NULL UNIQUE,
    `password` VARCHAR(128) NOT NULL,
    PRIMARY KEY (`mail`)
);

CREATE TABLE `student` (
    `id` VARCHAR(8) NOT NULL UNIQUE,
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
    FOREIGN KEY (`activity_id`) REFERENCES `activity`(`id`) ON DELETE CASCADE
);

CREATE TABLE `class_student` (
    `class_id` SMALLINT UNSIGNED NOT NULL,
    `student_id` VARCHAR(8) NOT NULL,
    `equipment_id` SMALLINT UNSIGNED NULL,
    PRIMARY KEY (`class_id`, `student_id`),
    FOREIGN KEY (`class_id`) REFERENCES `class`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`equipment_id`) REFERENCES `equipment`(`id`) ON DELETE CASCADE
);

INSERT INTO `shift` (name, start_time, end_time) VALUES
        ('Mañana', '08:00:00', '12:00:00'),
        ('Tarde', '14:00:00', '17:00:00'),
        ('Noche', '17:00:00', '22:00:00');


INSERT INTO `instructor` (id, first_name, last_name) VALUES
        ('12345678', 'John', 'Doe'),
        ('87654321', 'Jane', 'Smith'),
        ('11223344', 'Alice', 'Johnson'),
        ('22334455', 'Bob', 'Brown'),
        ('33445566', 'Charlie', 'Davis');
    

INSERT INTO `activity` (description, cost, min_age, max_age) VALUES
        ('Yoga', 100, 18, 60),
        ('Pilates', 150, 18, 60),
        ('Crossfit', 200, 18, 60),
        ('Swimming', 120, 5, 50),
        ('Cycling', 80, 10, 70);


INSERT INTO `equipment` (activity_id, description, cost) VALUES
        (1, 'Yoga Mat', 20),
        (2, 'Pilates Ball', 30),
        (3, 'Crossfit Rope', 40),
        (4, 'Swimming Goggles', 15),
        (5, 'Cycling Helmet', 25);

INSERT INTO `student` (id, mail, first_name, last_name, birth_day, phone) VALUES
        ('11111111', 'student1@mail.com', 'Student', 'One', '2000-01-07', '1234567890'),
        ('22222222', 'student2@mail.com', 'Student', 'Two', '1999-02-02', '2345678901'),
        ('33333333', 'student3@mail.com', 'Student', 'Three', '1998-03-03', '3456789012'),
        ('44444444', 'student4@mail.com', 'Student', 'Four', '1997-04-04', '4567890123'),
        ('55555555', 'student5@mail.com', 'Student', 'Five', '1996-05-05', '5678901234');

INSERT INTO `class` (dictated, instructor_id, shift_id, activity_id, student_quotas) VALUES
        (1, '12345678', 1, 1, 10),
        (1, '87654321', 2, 2, 15),
        (1, '11223344', 3, 3, 20),
        (1, '22334455', 1, 4, 25),
        (1, '33445566', 2, 5, 30);

INSERT INTO `class_student` (class_id, student_id, equipment_id) VALUES
        (1, '11111111', 1),
        (2, '22222222', 2),
        (3, '33333333', 3),
        (4, '44444444', 4),
        (5, '55555555', 5);

INSERT INTO `login` (mail, password) VALUES
        ("prueba@prueba.com", "prueba");

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
    WHERE 
        c.dictated = 1
    GROUP BY
        s.id
    ORDER BY
        total_classes DESC;

CREATE VIEW class_props AS
    SELECT
        c.dictated AS dictated,
        c.student_quotas AS student_quotas,
        i.first_name AS instructor,
        i.id AS instructor_id,
        s.id AS shift_id,
        s.name AS shift,
        a.id AS activity_id,
        a.description AS activity
        FROM
            class c
        JOIN
            instructor i ON c.instructor_id = i.id
        JOIN
            shift s ON c.shift_id = s.id
        JOIN
            activity a ON c.activity_id = a.id;