import express from 'express'
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import {notFound,errorHandler} from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js';
import cors from 'cors' 

connectDB();

const app = express();

const corsOptions = {
    origin: ["http://localhost:3000","http://localhost:5173"],
    // origin: "*",
    optionsSuccessStatus: 200, 
    credentials: true,
  };
  
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(express.static("public"));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req,res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler); 

app.listen(port, () => console.log(`Server started on port ${port}`));