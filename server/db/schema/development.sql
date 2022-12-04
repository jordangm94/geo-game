-- Users table seeds here (Example)
--  password is 123

DELETE from users;
INSERT INTO users
(user_name, password_hash, email)
VALUES ('Alice', '$2a$10$18hdKagp.BaaveVf4OWtIeD.mqr/ptK7K66bno1BygX.5dY4Hq7YO', 'alice@gmail.com'),
('Kira', '$2a$10$18hdKagp.BaaveVf4OWtIeD.mqr/ptK7K66bno1BygX.5dY4Hq7YO', 'kira@gmail.com'),
('Mike', '$2a$10$18hdKagp.BaaveVf4OWtIeD.mqr/ptK7K66bno1BygX.5dY4Hq7YO', 'mike@gmail.com'),
('Frank', '$2a$10$18hdKagp.BaaveVf4OWtIeD.mqr/ptK7K66bno1BygX.5dY4Hq7YO', 'frank@gmail.com'),
('Lucy', '$2a$10$18hdKagp.BaaveVf4OWtIeD.mqr/ptK7K66bno1BygX.5dY4Hq7YO', 'lucy@gamail.com');


DELETE from games;
INSERT INTO games
(user_id, start_time)
VALUES 
(1, NOW()),
(1, NOW()),
(2, NOW()),
(3, NOW()),
(3, NOW()),
(4, NOW()),
(5, NOW());


DELETE from questions;
INSERT INTO questions
(latitude, longitude)
VALUES (48.858215, 2.295780),
(51.502190, -0.139790),
(43.642384, -79.383911),
(-33.858954, 151.213414),
(40.731676, -73.996783),
(44.647506, -63.571306 ),
(43.649337, -79.371847),
(25.888227, -80.123856),
(39.767381999754846, -86.16354637493473),
(39.297711, -76.615422),
(37.810330, -122.476737),
(51.501073, -0.123975);

DELETE from turns;
INSERT INTO turns
(user_id, game_id, question_id, turn_number, score)
VALUES
(1, 1, 1, 1, 1400),
(1, 1, 4, 2, 2555),
(1, 1, 2, 3, 4300),

(1, 2, 1, 1, 3000),
(1, 2, 3, 2, 690),
(1, 2, 4, 3, 2700),

(2, 3, 4, 1, 500),
(2, 3, 2, 2, 4070),
(2, 3, 1, 3, 1999),

(3, 4, 3, 1, 5),
(3, 4, 4, 2, 2080),
(3, 4, 1, 3, 380),

(3, 5, 3, 1, 1500),
(3, 5, 4, 2, 4360),
(3, 5, 1, 3, 2800),

(4, 6, 3, 1, 599),
(4, 6, 4, 2, 3900),
(4, 6, 1, 3, 4800),

(5, 7, 3, 1, 3500),
(5, 7, 4, 2, 2800),
(5, 7, 1, 3, 4777);





;

