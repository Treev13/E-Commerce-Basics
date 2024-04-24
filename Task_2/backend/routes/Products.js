import { getProducts, getProduct, createProduct } from '../src/database.js';
import jwt from 'jsonwebtoken';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await getProducts();
    res.status(200).send(products);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const product = await getProduct(id);
    res.status(200).send(product);
});

router.post('/', authenticateToken, async (req, res) => {
    const { name, price, image, checked } = req.body;
    let active = 0;
    if (checked === 'on') {
        active = 1;
    }

    const product = await createProduct(name, price, image, active);
    res.status(201).send(product);
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

export default router;
