import 'dotenv/config';

import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import vocabularyRoutes from './routes/vocabularyRoutes';
import { setupSwagger } from './config/swagger';

const app: Application = express();
const port = Number(process.env.PORT ?? 5000);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535.');
}

app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use('/api/v1', vocabularyRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Welcome to ChineseGo API Server!' });
});

app.listen(port, () => {
  console.log(`ChineseGo API server is running on port ${port}.`);
  console.log(`Swagger documentation: http://localhost:${port}/api-docs`);
});