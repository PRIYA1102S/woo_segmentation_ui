import express from 'express';
import { json } from 'body-parser';
import { jwtMiddleware } from './middleware/jwt';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(jwtMiddleware);

// Define routes here
// Example: app.use('/api/products', productsRouter);

app.listen(PORT, () => {
    console.log(`Auth service is running on port ${PORT}`);
});