import client from '../database';

export type Product = {
  id?: number;
  productName: string;
  price: number;
  category: string;
};

export class Products {
  async index(): Promise<Product[]> {
    //Get
    try {
      const connection = await client.connect();
      const query = 'SELECT * FROM products';
      const result = await connection.query(query);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error('Cannot get products, ' + error);
    }
  }
  async create(p: Product): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO products (productname,category, price) VALUES($1, $2, $3) RETURNING *'; //RETURNING * gives last added
      const result = await connection.query(sql, [
        p.productName,
        p.category,
        p.price,
      ]);
      const product: Product = result.rows[0];
      connection.release();
      return product;
    } catch (error) {
      throw new Error(
        'Somthing went wrong while tring to add a product, ' + error
      );
    }
  }
  async show(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const connection = await client.connect();
      const result = await connection.query(sql, [id]);
      connection.release();
      const product = result.rows[0];
      return product;
    } catch (error) {
      throw new Error(`Could not find products ${id}. Error: ${error}`);
    }
  }
  async productsByCategory(category: string): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products WHERE category=($1)';
      const connection = await client.connect();
      const result = await connection.query(sql, [category]);
      connection.release();
      const products = result.rows;
      return products;
    } catch (error) {
      throw new Error(
        `Could not find products in the category ${category}. Error: ${error}`
      );
    }
  }
  async topFive(): Promise<Product[] | string> {
    try {
      const connection = await client.connect();

      const sql =
        'SELECT p.id, p.productname, sum(quantity) quantity ' +
        'FROM order_products op ' +
        'JOIN products p ON op.productid = p.id ' +
        'GROUP BY p.id ' +
        'ORDER BY sum(quantity) DESC LIMIT 5';

      const result = await connection.query(sql);
      connection.release();
      const products = result.rows;
      console.log(JSON.stringify(products));
      return products;
    } catch (error) {
      throw new Error(
        `Could not find products the most popular products. Error: ${error}`
      );
    }
  }
  async update(p: Product): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql =
        "UPDATE products SET product_name='$1', price=2$, category='$3') WHERE id= $3";
      const result = await connection.query(sql, [
        p.productName,
        p.price,
        p.category,
        p.id,
      ]);
      const product = result.rows[0];
      connection.release();
      return product;
    } catch (error) {
      throw new Error('Somthing went wrong while updating a product, ' + error);
    }
  }
  async delete(id: string) {
    try {
      const connection = await client.connect();
      const sql = 'DELETE FROM products WHERE id=($1)';
      const result = await connection.query(sql, [id]);
    } catch (error) {
      throw new Error('Somthing went wrong while deleting a product, ' + error);
    }
  }
}
