import request from 'supertest';
import { Request, Response } from 'express';
import { signup, verify } from '../auth/auth.controller';

describe('Authentication Controller', () => {
  it('should sign up a new user', async () => {
    // Mock the request and response objects
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password',
        firstname: 'John',
        lastname: 'Doe'
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    } as unknown as Response;

    // Call the signup function
    await signup(req, res);

    // Assert the response
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Signup successful',
      user: {
        email: 'test@example.com',
        firstname: 'John',
        lastname: 'Doe',
      },
      notice: 'Please ensure that you write down this API_key, it is a view once, and cannot be retrieved, retrieving is $200. View API key below: ',
      API_key: expect.any(String),
    });
  });

  it('should verify a user', async () => {
    // Mock the request and response objects
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password',
        API_key: '123456',
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    // Call the verify function
    await verify(req, res);

    // Assert the response
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('API key has been verified and is valid');
  });
});
