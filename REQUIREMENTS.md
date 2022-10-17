# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoint

#### Products

- @GET Index: `/products`
- @GET Show: `/product/:id`
- @POST Create(args: Product) [token required]: `/product/create`
- @DELETE [Additional] Delete [token required]: `/deleteProduct/:id`
- @GET [Optional] Product by Category: `/productsByCategory/:category`
- @GET [Optional] Top Five Products: `/topFiveProducts`

#### Users

- @POST Show (args: username, password)[token required]: `/login`
- @POST Create (args: User)[token required]: `/signup`
- @GET Index [token required]: `/users`

#### Orders

- @GET Order by User (args: user id) [token required]:`/orders/:id`
- @GET [Optional] Completed Orders by user (args: user id) [token required]: `/userComplateOrders/:id`
- @GET [Additional] Index [token required]:`/orders`
- @GET [Additional] Update to Close order [token required]:`/orders/closeOrder/:id`
- @GET [Additional] Create [token required]:`/createOrder/:id`
- @DELETE [Additional] Delete [token required]:`/orders/:id`
- @POST [Additional] Add Product to Order [token required]:`/orders/add`
- @GET [Additional] Display Full Order [token required]:`/orders/fullOrder`
- @GET [Additional] Active Orders by user [token required]:`/userActiveOrders/:id`

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

> CREATE TABLE products <br>( id SERIAL PRIMARY KEY,<br>productname varchar(255) NOT NULL,<br>category varchar(255) NOT NULL,<br>price NUMERIC (9, 2) NOT NULL );

#### User

- id
- firstName
- lastName
- username
- password

> CREATE TABLE users<br>( id SERIAL PRIMARY KEY,<br>firstname varchar(35) NOT NULL,<br>lastname varchar(35) NOT NULL,<br>username varchar(25) NOT NULL UNIQUE,<br>password varchar(255) NOT NULL );

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

> CREATE TABLE orders<br>( id SERIAL PRIMARY KEY,<br>status varchar(25) NOT NULL,<br>user_id INTEGER NOT NULL REFERENCES users(id));<br>
>
> > <br>CREATE TABLE order_products (<br>orderId INTEGER NOT NULL REFERENCES orders (id),<br>productId INTEGER NOT NULL REFERENCES products (id),<br>quantity INTEGER NOT NULL<br>);
