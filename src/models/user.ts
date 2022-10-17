import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
};
declare const process: {
  env: {
    BCRYPT_PASSWORD: string;
    SALT_ROUNDS: string;
    JWT_KEY: string;
  };
};
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export class listOfUsers {
  async index(): Promise<User[]> {
    //Get
    try {
      const connection = await client.connect();
      const query = 'SELECT  id, firstname, lastname, username  FROM users';
      const result = await connection.query(query);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error('Cannot get list of users, ' + error);
    }
  }
  async create(u: User): Promise<User> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO users (firstname, lastname, username, password) VALUES($1, $2, $3, $4) RETURNING *';

      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      const result = await connection.query(sql, [
        u.firstname,
        u.lastname,
        u.username,
        hash,
      ]);
      const newUser: User = result.rows[0];
      connection.release();
      return newUser;
    } catch (error) {
      throw new Error(
        `unable create user (${u.firstname} ${u.lastname}): ${error}`
      );
    }
  }

  async authenticate(
    username: string,
    plainPassword: string
  ): Promise<User | null> {
    const connection = await client.connect();
    const sql = 'SELECT * FROM users WHERE username=($1)';
    const result = await connection.query(sql, [username]);

    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(plainPassword + pepper, user.password)) {
        return user;
      } else {
      }
    }

    return null;
  }
}
