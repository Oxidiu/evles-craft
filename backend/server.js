import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js';
dotenv.config();
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { notFound, errorHandler } from './middleware/errorMiddleware.js.js';
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Cookie parser middleware
app.use(cookieParser())

app.use(cors())

app.get('/', (req, res) => {
    res.send('API is running...');
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    // any route that is not api will be redirected to  the home page
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend, build,  index.html')));
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    })
}
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`))
