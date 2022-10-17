/* Replace with your SQL commands */
CREATE TABLE users
( id SERIAL PRIMARY KEY,
 firstname varchar(35) NOT NULL,
 lastname varchar(35) NOT NULL,
  username varchar(25) NOT NULL UNIQUE,
  password varchar(255) NOT NULL );

