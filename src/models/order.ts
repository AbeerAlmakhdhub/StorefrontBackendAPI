import client from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id: number;
};
export interface OrderProduct {
  orderId: number;
  productId: number;
  quantity: number;
}

export class Orders {
  async index(): Promise<Order[]> {
    //Get
    try {
      const connection = await client.connect();
      const query = 'SELECT * FROM orders';
      const result = await connection.query(query);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error('Cannot get Orders, ' + error);
    }
  }
  async create(o: Order): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *'; //RETURNING * gives last added
      const result = await connection.query(sql, [o.status, o.user_id]);
      const Order = result.rows[0];
      connection.release();
      return Order;
    } catch (error) {
      throw new Error(
        'Somthing went wrong while tring to add a Order, ' + error
      );
    }
  }
  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const connection = await client.connect();
      const result = await connection.query(sql, [id]);
      connection.release();
      const Order = result.rows[0];
      return Order;
    } catch (error) {
      throw new Error(`Could not find Order ${id}. Error: ${error}`);
    }
  }
  async update(o: Order): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = "UPDATE Orders SET status='complete'" + 'WHERE id=' + o.id;

      const result = await connection.query(sql);
      connection.release();
      return this.show(o.id + '');
    } catch (error) {
      throw new Error('Somthing went wrong while updating a Order, ' + error);
    }
  }
  async delete(id: string) {
    try {
      const Order = this.show(id);
      const connection = await client.connect();
      const sql = 'DELETE FROM "Orders" WHERE id=' + id;
      const result = await connection.query(sql);
      return Order;
    } catch (error) {
      throw new Error('Somthing went wrong while deleting a Order, ' + error);
    }
  }
  // Cart side
  async addProduct(
    quantity: number,
    orderId: number,
    productId: number,
    user_id: number
  ): Promise<OrderProduct | string> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO order_products (quantity, orderId, productId) ' +
        'VALUES($1,(SELECT id from orders WHERE id=($2)), (SELECT id from products WHERE id=($3)))  RETURNING *';

      const result = await connection.query(sql, [
        quantity,
        orderId,
        productId,
      ]);
      const order = result.rows[0];
      connection.release();
      return order;
    } catch (error) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${error}`
      );
    }
  }
  async fullOrder(orderId: number): Promise<string> {
    try {
      const connection = await client.connect();
      const query =
        'SELECT * FROM ordersSELECT *' +
        'FROM orders ' +
        'JOIN order_products ' +
        'ON orders.id=order_products.orderId;';
      const result = await connection.query(query);
      connection.release();
      return JSON.stringify(result.rows);
    } catch (error) {
      throw new Error('Cannot get Orders, ' + error);
    }
  }
  async userActiveOrders(user_id: number): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql =
        "SELECT * FROM orders WHERE status = 'active' AND user_id =($1) ";
      const result = await connection.query(sql, [user_id]);
      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to get active orders of the user: ${error}`);
    }
  }
  async userComplateOrders(user_id: number): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql =
        "SELECT * FROM orders WHERE status = 'complete' AND user_id =($1) ";
      const result = await connection.query(sql, [user_id]);

      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to get active orders of the user: ${error}`);
    }
  }
}
