import config from 'config';
import express from 'express';
import http from 'http';

export interface BuildAppType {
  app: express.Application;
  server: http.Server;
  shutdown: () => void;
}

export const buildApp = () => {
  const baseUri: string = config.get('baseUrl');
  const defaultPortNumber: number = config.get('port');

  // Create a new express application instance
  const app: express.Application = express();

  // The port the express app will listen on
  const port: number = process.env.PORT
    ? parseInt(process.env.PORT)
    : defaultPortNumber;

  // Define the `/hello` endpoint
  app.get('/hello', (_, res) => {
    // Send 'Hello World' response
    res.send('Hello World');
  });

  // Start the server and store the server instance
  const server = app.listen(port, () => {
    console.log(`Listening at ${baseUri}:${port}/hello`);
  });

  // Graceful shutdown logic
  const shutdown = () => {
    console.log('Shutting down server...');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  };

  // Handle termination signals
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

  return { app, server, shutdown };
};
