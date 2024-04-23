import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

const usersArray = [{
    'email': 'teszt.bela@onliveit.hu',
    'password': '$2b$10$FLhKjds6.S7XbObewqDI/.fB1EqrvaQEdoWp/oPfxY5rlzdlwXWnm'
}];

router.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { 'email': req.body.email, 'password': hashedPassword };
        usersArray.push(user);
        res.status(201).send();
    } catch {
        res.status(500).send();
    };
});

router.post('/login', async (req, res) => {
    const user = usersArray.find((user) => user.email === req.body.email);

    if (user === undefined) {
        return res.status(400).send('Cannot find user');
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            res.status(200).send(accessToken);
        } else {
            res.status(401).send('Wrong password');
        }
    } catch {
        res.status(500).send();
    }
});

export default router;
