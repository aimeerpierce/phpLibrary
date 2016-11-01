CREATE TABLE books
(
BookId INT(10),
BookTitle Varchar(255),
Author Varchar(255),
Availability TINYINT
);

CREATE TABLE users
(
userName Varchar(255),
Password Varchar(255),
Email Varchar(255),
Phone INT(10),
Librarian TINYINT,
FirstName Varchar(255),
LastName Varchar(255)
);

CREATE TABLE loanHistory
(
UserName Varchar(255),
BookId INT(10),
DueDate DATE,
ReturnedDate DATE
);

CREATE TABLE shelves
(
ShelfId INT(10),
ShelfName Varchar(255),
BookId INT(10)
);