import { Order, Orders } from '../models/order';

const orderList = new Orders();

describe('Orders Model', function () {
  it('should have an create method', async (): Promise<void> => {
    expect(orderList.create).toBeDefined();
  });

  it('should have a userActiveOrders method', async (): Promise<void> => {
    expect(orderList.userActiveOrders).toBeDefined();
  });

  it('should have a userComplateOrders method', async (): Promise<void> => {
    expect(orderList.userComplateOrders).toBeDefined();
  });

  it('create an order', async (): Promise<void> => {
    const result = await orderList.create({
      status: 'active',
      user_id: 1,
    });
    const resultOrder: Order = { id: 1, status: 'active', user_id: 1 };
    expect(result).toEqual(resultOrder);
  });

  it('index method should return a list of orders', async (): Promise<void> => {
    const result = await orderList.index();

    const resultOrder: Order[] = [{ id: 1, status: 'active', user_id: 1 }];
    expect(result).toEqual(resultOrder);
  });

  it('userActiveOrders method should return active orders of users', async (): Promise<void> => {
    const result = await orderList.userActiveOrders(1);
    const resultOrder: Order = { id: 1, status: 'active', user_id: 1 };
    expect(result[0]).toEqual(resultOrder);
  });
  it('userComplateOrders method should return complete orders of users', async (): Promise<void> => {
    orderList.create({ status: 'complete', user_id: 1 });
    const result = await orderList.userComplateOrders(1);
    const resultOrder: Order = { id: 2, status: 'complete', user_id: 1 };
    expect(result[0]).toEqual(resultOrder);
  });
});
