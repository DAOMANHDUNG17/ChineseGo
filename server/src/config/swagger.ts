import path from 'node:path';
import { type Application, type Request, type Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ChineseGo API Documentation',
      version: '1.0.0',
      description: 'API documentation for ChineseGo backend services, built with Express and TypeScript.',
    },
    servers: [{ url: '/', description: 'Current server' }],
  },
  apis: [
    path.join(__dirname, '../routes/*.ts').replace(/\\/g, '/'),
    path.join(__dirname, '../routes/*.js').replace(/\\/g, '/'),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Application): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/api-docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};