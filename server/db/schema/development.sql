-- Users table seeds here (Example)
--  password is 123

DELETE from users;
INSERT INTO users
(id, user_name, password_hash, email)
VALUES (101, 'Alice', '$2a$10$18hdKagp.BaaveVf4OWtIeD.mqr/ptK7K66bno1BygX.5dY4Hq7YO', 'alice@gmail.com'),
(102, 'Kira', '$2a$10$18hdKagp.BaaveVf4OWtIeD.mqr/ptK7K66bno1BygX.5dY4Hq7YO', 'kira@gmail.com'),
(103, 'Mike', '$2a$10$18hdKagp.BaaveVf4OWtIeD.mqr/ptK7K66bno1BygX.5dY4Hq7YO', 'mike@gmail.com'),
(104, 'Frank', '$2a$10$18hdKagp.BaaveVf4OWtIeD.mqr/ptK7K66bno1BygX.5dY4Hq7YO', 'frank@gmail.com'),
(105, 'Lucy', '$2a$10$18hdKagp.BaaveVf4OWtIeD.mqr/ptK7K66bno1BygX.5dY4Hq7YO', 'lucy@gamail.com');


DELETE from games;
INSERT INTO games
(id, user_id, start_time)
VALUES 
(1001, 101, NOW()),
(1002, 101, NOW()),
(1003, 102, NOW()),
(1004, 103, NOW());


DELETE from questions;
INSERT INTO questions
(id,latitude, longitude)
VALUES (1, 48.858215, 2.295780),
(2, 51.502190, -0.139790),
(3, 43.642384, -79.383911),
(4, -33.858954, 151.213414),
(5,  40.731676, -73.996783),
(6, 44.647506, -63.571306 ),
(7, 43.649337, -79.371847),
(8, 25.888227, -80.123856),
(9, 39.767381999754846, -86.16354637493473),
(10, 39.297711, -76.615422),
(11, 37.810330, -122.476737),
(12, 51.501073, -0.123975);

DELETE from turns;
INSERT INTO turns
(user_id, game_id, question_id, turn_number, score)
VALUES
(101, 1001, 1, 1, 10),
(101, 1001, 4, 2, 20),
(101, 1001, 2, 3, 5),

(101, 1002, 1, 1, 4),
(101, 1002, 3, 2, 6),
(101, 1002, 4, 3, 10),

(102, 1003, 4, 1, 50),
(102, 1003, 2, 2, 40),
(102, 1003, 1, 3, 10),

(103, 1004, 3, 1, 5),
(103, 1004, 4, 2, 20),
(103, 1004, 1, 3, null);

