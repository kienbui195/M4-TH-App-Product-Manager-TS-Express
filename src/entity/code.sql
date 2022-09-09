use dbtest;

create table products (
                          id int primary key auto_increment,
                          name varchar(255),
                          price int,
                          author varchar(255),
                          avatar varchar(255)
);