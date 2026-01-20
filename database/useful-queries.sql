use studycircle;

select * from users;
select * from books;
DELETE FROM users WHERE userName = 'testuser';
SELECT * FROM users WHERE username = 'user' OR email = 'user';

SET FOREIGN_KEY_CHECKS = 0;
truncate table users;
SET FOREIGN_KEY_CHECKS = 1;