import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { userRouter } from './routes/users.js';
import { recipesRouter } from './routes/recipes.js';

const app = express();

app.use(express.json()); //it will convert the incoming data from the frontend to json

app.use(cors());

app.use('/auth', userRouter);
app.use('/recipes', recipesRouter);

mongoose.connect(
  'mongodb+srv://asijit:qXlOqc8vTaaUyb7g@recipes.om9fbks.mongodb.net/recipes?retryWrites=true&w=majority'
);

app.listen(3001, () => console.log('Server Started!!'));
