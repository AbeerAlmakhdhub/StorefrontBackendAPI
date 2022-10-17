import { listOfUsers, User } from '../models/user';

const users = new listOfUsers();

describe('Users Model', function () {
  it('should have a index method', async (): Promise<void> => {
    expect(users.index).toBeDefined();
  });

  it('should have a create method', async (): Promise<void> => {
    expect(users.create).toBeDefined();
  });

  it('should have an authenticate method', async (): Promise<void> => {
    expect(users.authenticate).toBeDefined();
  });

  it('create an User', async (): Promise<void> => {
    const result = await users.create({
      firstname: 'merryweather',
      lastname: 'fairy',
      username: 'merryweather',
      password: 'blue',
    });
    const resultUser: User = {
      id: 1,
      firstname: 'merryweather',
      lastname: 'fairy',
      username: 'merryweather',
      password: 'blue',
    };
    expect(result.id).toBe(resultUser.id);
    expect(result.firstname).toBe(resultUser.firstname);
    expect(result.lastname).toBe(resultUser.lastname);
    expect(result.username).toBe(resultUser.username);
  });

  it('index method should return a list of Users', async (): Promise<void> => {
    const result = await users.index();

    const resultUser: User[] = [
      {
        id: 1,
        firstname: 'merryweather',
        lastname: 'fairy',
        username: 'merryweather',
        password: 'blue',
      },
    ];
    expect(result[0].id).toBe(resultUser[0].id);
    expect(result[0].firstname).toBe(resultUser[0].firstname);
    expect(result[0].lastname).toBe(resultUser[0].lastname);
    expect(result[0].username).toBe(resultUser[0].username);
  });

  it('show method should return the correct User', async (): Promise<void> => {
    const result = await users.authenticate('merryweather', 'blue');
    const resultUser: User = {
      id: 1,
      firstname: 'merryweather',
      lastname: 'fairy',
      username: 'merryweather',
      password: 'blue',
    };
    expect(result).not.toBe(null);
  });
});
