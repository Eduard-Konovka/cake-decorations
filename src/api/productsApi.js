import products from 'db/products.json';

export default async function productsApi() {
  const response = await products;

  return response;
}
