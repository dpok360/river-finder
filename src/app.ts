import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import riverRoutes from './routes/riverRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'River Finder API', version: '1.0.0' });
});

app.use('/api/rivers/nearby', riverRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
