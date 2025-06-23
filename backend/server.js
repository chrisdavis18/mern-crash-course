import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import cors from 'cors';
import path from 'path';

// Config Environment Variables
dotenv.config();

// Create Express App
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json()); // allows us to accept json data in body
// app.use(cors());
// app.all('/{*any}', (req, res, next) => {})
app.use('/api/products', productRoutes);

// Serve Up Static Files
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
    });
    
}


app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});

// DB User
// chrisdavis18
// DB Password
// HHvrphGxFB4tJfun