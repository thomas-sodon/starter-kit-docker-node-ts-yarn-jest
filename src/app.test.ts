import http from 'http';
import request from 'supertest';
import { App } from 'supertest/types';

import { buildApp } from './app';

describe('GET /hello', () => {
  let app: App;
  let server: http.Server;
  beforeAll(() => {
    // This will be executed before all tests
    // This is where you should start your server
    ({ app, server } = buildApp());
  });
  afterAll(() => {
    server.close();
  });
  it('responds with Hello World', async () => {
    const response = await request(app).get('/hello');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello World');
  });
});
