const express = require('express');
const mongodb = require('mongodb');
const crypto = require('node:crypto');
const jwt = require("jsonwebtoken");

const router = express.Router();

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

async function checkDuplicateEmail(email) {
    const admins = await loadAdminUserCollection();
    return await admins.find({"email": email}).toArray();
}

/**
 * Get all admin details
 */
router.get('/', async (req, res) => {
    const admins = await loadAdminUserCollection();
    res.send(await admins.find({}).toArray());
});

/**
 * Admin registrtion
 */
router.post('/', async (req, res) => {
    try {

        if ((await checkDuplicateEmail(req.body.email)).length === 0) {
            const admins = await loadAdminUserCollection();
            const token = jwt.sign({name: req.body.username, email: req.body.email}, "secret");
            const data = await admins.insertOne({
                username: req.body.username,
                email: req.body.email,
                password: getHashedPassword(req.body.password),
                createdAt: new Date(),
                tokens: {
                    token: token
                }
            });
            const insertData = await admins.find({"_id": data.insertedId}).toArray()
            res.status(201).send(insertData);
        } else {
            return res.status(401).send('Email already exit!');
        }

    } catch (err) {
        return res.status(401).send('Insert failed!');
    }

});

/**
 * Admin login
 */
router.post('/login', async (req, res) => {

    try {
        const {email, password} = req.body;
        const hashedPassword = getHashedPassword(password);
        const admins = await loadAdminUserCollection();
        const admin = await admins.find({"email": email, "password": hashedPassword},).toArray();

        if (admin.length === 0) {
            return res.status(401).send('Login failed! Check authentication credentials');
        }

        const token = jwt.sign({name: admin[0].username, email: admin[0].email}, "secret");
        await admins.updateOne({"_id": admin[0]._id}, {$set: {tokens: {token: token}}})
        res.status(201).send(admin);

    } catch (err) {
        return res.status(401).send('Login failed!');
    }


})


async function loadAdminUserCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://Kiruththi:LGdD0T1cBs7RHL8z@database.cvfdy9w.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });
    return client.db('bubble_bee').collection('adminUsers');
}


module.exports = router;