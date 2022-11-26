-- Users table seeds here (Example)
--  password is 123

DELETE from users;
INSERT INTO users
(id, name, password_hash, email)
VALUES (1, 'Alice', '$2a$10$18hdKagp.BaaveVf4OWtIeD.mqr/ptK7K66bno1BygX.5dY4Hq7YO', 'alice@gmail.com'),
(2, 'Kira', '$2a$10$18hdKagp.BaaveVf4OWtIeD.mqr/ptK7K66bno1BygX.5dY4Hq7YO', 'kira@gmail.com'),
(3, 'Mike', '$2a$10$18hdKagp.BaaveVf4OWtIeD.mqr/ptK7K66bno1BygX.5dY4Hq7YO', 'mike@gmail.com'),
(4, 'Frank', '$2a$10$18hdKagp.BaaveVf4OWtIeD.mqr/ptK7K66bno1BygX.5dY4Hq7YO', 'frank@gmail.com'),
(5, 'Lucy', '$2a$10$18hdKagp.BaaveVf4OWtIeD.mqr/ptK7K66bno1BygX.5dY4Hq7YO', 'lucy@gamail.com');


DELETE from games;
INSERT INTO games
(id, user_id, start_time)
VALUES 
(1, 1, '2022-01-10'),
(2, 1, '2022-01-10'),
(3, 2, '2022-01-10'),
(4, 3, '2022-01-10');


DELETE from questions;
INSERT INTO questions
(id,latitude, longitude)
VALUES (1, 48.858215, 2.295780),
(2, 48.858215, 2.295780),
(3, 48.858215, 2.295780),
(4, 48.858215, 2.295780);

DELETE from turnes;
INSERT INTO turnes
(user_id, game_id, question_id, turn_number)
VALUES
(1, 1, 1, 1),
(1, 1, 4, 2),
(1, 1, 2, 3),

(1, 2, 1, 1),
(1, 2, 3, 2),
(1, 2, 4, 3),

(2, 3, 4, 1),
(2, 3, 2, 2),
(2, 3, 1, 3),

(3, 4, 3, 1),
(3, 4, 4, 2),
(3, 4, 1, 3);

