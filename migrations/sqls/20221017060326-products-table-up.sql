/* Replace with your SQL commands */
CREATE TABLE products
( id SERIAL PRIMARY KEY,
  productname varchar(255) NOT NULL,
  category varchar(255) NOT NULL,
  price NUMERIC (9, 2) NOT NULL );
