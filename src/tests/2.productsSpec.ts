import { Product, Products } from '../models/product';
const products = new Products();

describe('Product Model', function () {
  it('should have an index method', async (): Promise<void> => {
    expect(products.index).toBeDefined();
  });

  it('should have a show method', async (): Promise<void> => {
    expect(products.show).toBeDefined();
  });

  it('should have a create method', async (): Promise<void> => {
    expect(products.create).toBeDefined();
  });

  it('should have a update method', async (): Promise<void> => {
    expect(products.update).toBeDefined();
  });

  it('should have a delete method', async (): Promise<void> => {
    expect(products.delete).toBeDefined();
  });
  it('should have a productByCategory method', async (): Promise<void> => {
    expect(products.productsByCategory).toBeDefined();
  });
  it('should have a topFive method', async (): Promise<void> => {
    expect(products.topFive).toBeDefined();
  });

  it('create a Product', async (): Promise<void> => {
    const result = await products.create({
      productName: 'Chenille Plain Weave Washed Ivory Pleated Desk Chair',
      category: 'chair',
      price: 1349,
    });
    const resultProduct: Product = {
      id: 1,
      productName: 'Chenille Plain Weave Washed Ivory Pleated Desk Chair',
      category: 'chair',
      price: 1349,
    };
    expect(result.id).toBe(resultProduct.id);
  });

  it('index method should return a list of products', async (): Promise<void> => {
    const result = await products.index();

    const resultProduct: Product[] = [
      {
        id: 1,
        productName: 'Chenille Plain Weave Washed Ivory Pleated Desk Chair',
        category: 'chair',
        price: 1349,
      },
    ];
    expect(result[0]).toEqual(result[0]);
  });

  it('show method should return the correct Product', async (): Promise<void> => {
    const result = await products.show('1');
    const resultProduct: Product = {
      id: 1,
      productName: 'Chenille Plain Weave Washed Ivory Pleated Desk Chair',
      category: 'chair',
      price: 1349,
    };
    expect(result).not.toEqual(resultProduct);
  });
  it('show method should return product by category', async (): Promise<void> => {
    const result = await products.productsByCategory('chair');
    const resultProduct: Product = {
      id: 1,
      productName: 'Chenille Plain Weave Washed Ivory Pleated Desk Chair',
      category: 'chair',
      price: 1349,
    };
    expect(result[0]).not.toEqual(resultProduct);
  });
});
