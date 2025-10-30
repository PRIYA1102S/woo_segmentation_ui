import request from 'supertest';
import app from '../src/app';

describe('API Service', () => {
  it('should return a list of products', async () => {
    const response = await request(app).get('/api/products');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return a specific product by ID', async () => {
    const response = await request(app).get('/api/products/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  it('should return 404 for a non-existent product', async () => {
    const response = await request(app).get('/api/products/999');
    expect(response.status).toBe(404);
  });

  it('should create a new product', async () => {
    const newProduct = {
      name: 'Test Product',
      price: 19.99,
      description: 'This is a test product.',
    };
    const response = await request(app).post('/api/products').send(newProduct);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should update an existing product', async () => {
    const updatedProduct = {
      name: 'Updated Product',
      price: 29.99,
    };
    const response = await request(app).put('/api/products/1').send(updatedProduct);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Updated Product');
  });

  it('should delete a product', async () => {
    const response = await request(app).delete('/api/products/1');
    expect(response.status).toBe(204);
  });
});