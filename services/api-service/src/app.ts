import express from 'express';
import bodyParser from 'body-parser';
import productsRoutes from './routes/products';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/products', productsRoutes);

app.listen(PORT, () => {
    console.log(`API Service is running on http://localhost:${PORT}`);
});