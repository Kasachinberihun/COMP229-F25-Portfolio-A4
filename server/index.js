import express from 'express';
import morgan from 'morgan';
import mongoose from "mongoose";
import dotenv from 'dotenv/config';

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, "MongoDB connection error: "));
connection.once('open', () => { console.log('Connected to MongoDB'); });

import projectRoutes from './routes/project.js';
import userRoutes from './routes/user.js';

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.use(morgan('dev'));

//Routes

app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes)

app.use('/api/data', (req, res) => {
    res.json({ message: 'Hello from the API! Again' });
});


app.listen(3000);

console.log('Server running at http://localhost:3000/');