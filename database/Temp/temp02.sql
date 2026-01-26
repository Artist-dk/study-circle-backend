
select * from books;
select fileURL from books;
truncate books;
alter table books 
rename column fileURL to filename;
ALTER TABLE books
ADD path VARCHAR(100);

--         fieldname: 'file',
--         originalname: 'JavaScript .pdf',
--         encoding: '7bit',
--         mimetype: 'application/pdf',
--         destination: 'uploads/',
--         filename: 'JavaScript .pdf',
--         path: 'uploads\\JavaScript .pdf',
--         size: 336526

INSERT INTO books (
  id, title, author, pages, language, bookType, publicationDate,
  publisher, genre, edition, price, description, coverImageURL, filename
) VALUES
(1, 'The Great Gatsby', 'F. Scott Fitzgerald', 180, 'English', 'ebook', '1925-04-10',
 'Charles Scribner''s Sons', 'Fiction', 'First', 10.99,
 'A novel by F. Scott Fitzgerald.',
 'https://example.com/great-gatsby-cover.jpg',
 'uploads\\book_1.pdf'),

(2, 'To Kill a Mockingbird', 'Harper Lee', 281, 'English', 'ebook', '1960-07-11',
 'J.B. Lippincott & Co.', 'Fiction', 'First', 12.50,
 'A novel about racial injustice.',
 'https://example.com/mockingbird.jpg',
 'uploads\\book_2.pdf'),

(3, '1984', 'George Orwell', 328, 'English', 'ebook', '1949-06-08',
 'Secker & Warburg', 'Dystopian', 'First', 14.99,
 'A dystopian novel.',
 'https://example.com/1984.jpg',
 'uploads\\book_3.pdf'),

(4, 'Animal Farm', 'George Orwell', 112, 'English', 'ebook', '1945-08-17',
 'Secker & Warburg', 'Political Satire', 'First', 9.99,
 'A political allegory.',
 'https://example.com/animalfarm.jpg',
 'uploads\\book_4.pdf'),

(5, 'Pride and Prejudice', 'Jane Austen', 279, 'English', 'ebook', '1813-01-28',
 'T. Egerton', 'Romance', 'First', 11.49,
 'A romantic novel.',
 'https://example.com/pride.jpg',
 'uploads\\book_5.pdf'),

(6, 'Moby Dick', 'Herman Melville', 635, 'English', 'ebook', '1851-10-18',
 'Harper & Brothers', 'Adventure', 'First', 15.99,
 'A story of a giant whale.',
 'https://example.com/mobydick.jpg',
 'uploads\\book_6.pdf'),

(7, 'The Catcher in the Rye', 'J.D. Salinger', 214, 'English', 'ebook', '1951-07-16',
 'Little, Brown and Company', 'Fiction', 'First', 10.99,
 'A novel about teenage angst.',
 'https://example.com/catcher.jpg',
 'uploads\\book_7.pdf'),

(8, 'The Hobbit', 'J.R.R. Tolkien', 310, 'English', 'ebook', '1937-09-21',
 'George Allen & Unwin', 'Fantasy', 'First', 13.99,
 'A fantasy adventure.',
 'https://example.com/hobbit.jpg',
 'uploads\\book_8.pdf'),

(9, 'The Lord of the Rings', 'J.R.R. Tolkien', 1178, 'English', 'ebook', '1954-07-29',
 'George Allen & Unwin', 'Fantasy', 'First', 29.99,
 'Epic fantasy trilogy.',
 'https://example.com/lotr.jpg',
 'uploads\\book_9.pdf'),

(10, 'Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', 309, 'English', 'ebook', '1997-06-26',
 'Bloomsbury', 'Fantasy', 'First', 19.99,
 'The beginning of a wizard''s journey.',
 'https://example.com/hp1.jpg',
 'uploads\\book_10.pdf'),

(11, 'Harry Potter and the Chamber of Secrets', 'J.K. Rowling', 341, 'English', 'ebook', '1998-07-02',
 'Bloomsbury', 'Fantasy', 'First', 19.99,
 'The second year at Hogwarts.',
 'https://example.com/hp2.jpg',
 'uploads\\book_11.pdf'),

(12, 'Harry Potter and the Prisoner of Azkaban', 'J.K. Rowling', 435, 'English', 'ebook', '1999-07-08',
 'Bloomsbury', 'Fantasy', 'First', 20.99,
 'Dark secrets revealed.',
 'https://example.com/hp3.jpg',
 'uploads\\book_12.pdf'),

(13, 'The Alchemist', 'Paulo Coelho', 208, 'English', 'ebook', '1988-01-01',
 'HarperTorch', 'Philosophy', 'First', 9.99,
 'A journey of self-discovery.',
 'https://example.com/alchemist.jpg',
 'uploads\\book_13.pdf'),

(14, 'The Da Vinci Code', 'Dan Brown', 689, 'English', 'ebook', '2003-03-18',
 'Doubleday', 'Mystery', 'First', 16.99,
 'A mystery thriller.',
 'https://example.com/davinci.jpg',
 'uploads\\book_14.pdf'),

(15, 'The Kite Runner', 'Khaled Hosseini', 371, 'English', 'ebook', '2003-05-29',
 'Riverhead Books', 'Fiction', 'First', 14.50,
 'A powerful emotional story.',
 'https://example.com/kiterunner.jpg',
 'uploads\\book_15.pdf'),

(16, 'Life of Pi', 'Yann Martel', 331, 'English', 'ebook', '2001-09-11',
 'Knopf Canada', 'Adventure', 'First', 13.75,
 'A boy stranded at sea.',
 'https://example.com/lifeofpi.jpg',
 'uploads\\book_16.pdf'),

(17, 'The Book Thief', 'Markus Zusak', 552, 'English', 'ebook', '2005-03-14',
 'Picador', 'Historical Fiction', 'First', 15.25,
 'A story narrated by Death.',
 'https://example.com/bookthief.jpg',
 'uploads\\book_17.pdf'),

(18, 'The Chronicles of Narnia', 'C.S. Lewis', 767, 'English', 'ebook', '1956-10-16',
 'Geoffrey Bles', 'Fantasy', 'First', 24.99,
 'A fantasy series.',
 'https://example.com/narnia.jpg',
 'uploads\\book_18.pdf'),

(19, 'Jane Eyre', 'Charlotte Brontë', 532, 'English', 'ebook', '1847-10-16',
 'Smith, Elder & Co.', 'Romance', 'First', 12.99,
 'A gothic romance novel.',
 'https://example.com/janeeyre.jpg',
 'uploads\\book_19.pdf'),

(20, 'Wuthering Heights', 'Emily Brontë', 416, 'English', 'ebook', '1847-12-01',
 'Thomas Cautley Newby', 'Drama', 'First', 11.99,
 'A tragic love story.',
 'https://example.com/wuthering.jpg',
 'uploads\\book_20.pdf'),

(21, 'The Odyssey', 'Homer', 541, 'Greek', 'ebook', '0800-01-01',
 'Ancient Greece', 'Epic', 'Classic', 18.99,
 'An epic Greek poem.',
 'https://example.com/odyssey.jpg',
 'uploads\\book_21.pdf'),

(22, 'The Iliad', 'Homer', 683, 'Greek', 'ebook', '0750-01-01',
 'Ancient Greece', 'Epic', 'Classic', 18.99,
 'A legendary epic poem.',
 'https://example.com/iliad.jpg',
 'uploads\\book_22.pdf'),

(23, 'Crime and Punishment', 'Fyodor Dostoevsky', 671, 'English', 'ebook', '1866-01-01',
 'The Russian Messenger', 'Psychological Fiction', 'First', 16.49,
 'A psychological novel.',
 'https://example.com/crime.jpg',
 'uploads\\book_23.pdf'),

(24, 'The Brothers Karamazov', 'Fyodor Dostoevsky', 824, 'English', 'ebook', '1880-01-01',
 'The Russian Messenger', 'Philosophical Fiction', 'First', 17.99,
 'A philosophical novel.',
 'https://example.com/karamazov.jpg',
 'uploads\\book_24.pdf'),

(25, 'Don Quixote', 'Miguel de Cervantes', 863, 'English', 'ebook', '1605-01-16',
 'Francisco de Robles', 'Adventure', 'First', 19.99,
 'A classic adventure.',
 'https://example.com/donquixote.jpg',
 'uploads\\book_25.pdf'),

(26, 'War and Peace', 'Leo Tolstoy', 1225, 'English', 'ebook', '1869-01-01',
 'The Russian Messenger', 'Historical Fiction', 'First', 22.99,
 'A historical epic.',
 'https://example.com/warpeace.jpg',
 'uploads\\book_26.pdf'),

(27, 'Anna Karenina', 'Leo Tolstoy', 864, 'English', 'ebook', '1877-01-01',
 'The Russian Messenger', 'Drama', 'First', 18.49,
 'A tragic romance.',
 'https://example.com/annakarenina.jpg',
 'uploads\\book_27.pdf'),

(28, 'The Old Man and the Sea', 'Ernest Hemingway', 127, 'English', 'ebook', '1952-09-01',
 'Charles Scribner''s Sons', 'Literary Fiction', 'First', 9.49,
 'A fisherman''s struggle.',
 'https://example.com/oldmansea.jpg',
 'uploads\\book_28.pdf'),

(29, 'The Metamorphosis', 'Franz Kafka', 201, 'English', 'ebook', '1915-01-01',
 'Kurt Wolff Verlag', 'Absurdist Fiction', 'First', 8.99,
 'A man transforms into an insect.',
 'https://example.com/metamorphosis.jpg',
 'uploads\\book_29.pdf'),

(30, 'The Stranger', 'Albert Camus', 123, 'English', 'ebook', '1942-01-01',
 'Gallimard', 'Philosophical Fiction', 'First', 9.99,
 'An existential novel.',
 'https://example.com/stranger.jpg',
 'uploads\\book_30.pdf');
