/* Replace with your SQL commands */
  CREATE TABLE order_products (
  orderId  INTEGER NOT NULL REFERENCES orders (id),
  productId INTEGER NOT NULL REFERENCES products (id),
  quantity   INTEGER NOT NULL
);