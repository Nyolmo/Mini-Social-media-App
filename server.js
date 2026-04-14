import express from 'express';
import { connectDB } from './config/db.js';
import authRouter from './routers/authRouter.js';
import postRouter from './routers/postRouter.js';

const PORT = process.env.PORT || 5000;

const app = express();
connectDB();

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);


app.listen(PORT, ()=>{
    console.log(`App running on PORT ${PORT}`)
});