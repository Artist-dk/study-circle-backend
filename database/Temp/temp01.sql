select * from users;
DELETE FROM users WHERE userName = 'Ghost' ;
SELECT * FROM users WHERE username = 'user' OR email = 'user';



select * from test_table;

drop table test_table;
create table test_table (
	id int auto_increment primary key,
    fname varchar(15),
    num int(10),
    url varchar(100),
    files varchar(100),
    obj json
);


select * from messages;