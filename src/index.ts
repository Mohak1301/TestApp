import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/db';
import authRoutes from './routes/authRoute';
import questionRoutes from './routes/questionRoute'
import testRoutes from './routes/testRoute'

dotenv.config();
const app = express();

dbConnect();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/test', testRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from ES6 + TypeScript!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
