import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/database.js';
import {
  authRoutes,
  userRoutes,
  groceryItemRoutes,
  recipeRoutes,
  recommendationRoutes,
} from './routes/index.js';

dotenv.config();

const app = express();

// connect to MongoDB
connectDB();

// middlleware for parsing JSON payloads
app.use(express.json());

// middleware for handling CORS (Cross-Origin Resource Sharing)
app.use(
  cors({
    origin: `http://localhost:${process.env.FRONTEND_PORT}`, //update with frontend domain
    credentials: true,
  })
);

app.use((req, res, next) => {
  if (req.is('application/json')) {
    express.json()(req, res, next);
  } else {
    next();
  }
});

//calling all the routes here
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/grocery-items', groceryItemRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/recommendations', recommendationRoutes);

/**
 * start the server.
 * the server listens on the specified port (default: 3000).
 */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
