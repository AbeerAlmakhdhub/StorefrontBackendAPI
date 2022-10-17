/* Replace with your SQL commands */
CREATE TABLE orders
( id SERIAL PRIMARY KEY,
  status varchar(25) NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id));
