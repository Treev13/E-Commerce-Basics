import express from 'express';
import userRoute from './routes/Users.js';
import productRoute from './routes/Products.js';

const app = express();

app.use(express.json());

app.use('/users', userRoute);
app.use('/api/products', productRoute);

app.listen(8080, () => {
    console.log('Server is listening on port 8080');
});