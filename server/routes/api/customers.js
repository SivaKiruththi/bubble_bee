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
    const customers = await loadCustomerCollection();
    return await customers.find({"email": email}).toArray();
}

/**
 * Get all customer details
 */
router.get('/', async (req, res) => {
    const customers = await loadCustomerCollection();
    res.send(await customers.aggregate([{
        $lookup: {
            from: "purchases",
            localField: "localField",
            foreignField:"email",
            as:"customerPurchase"
        }
    }]).toArray());
});

/**
 * Customer registration
 */
router.post('/registration', async (req, res) => {
    try {
        if ((await checkDuplicateEmail(req.body.email)).length === 0) {
            const customers = await loadCustomerCollection();
            const token = jwt.sign({name: req.body.username, email: req.body.email}, "secret");
            const manualId = "CST" + Date.now().toString(36) + Math.random().toString(36).substr(2);
            const data = await customers.insertOne({
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                dateOfBirthday: req.body.dateOfBirthday,
                manualId: manualId,
                password: getHashedPassword(req.body.password),
                createdAt: new Date(),
                tokens: {
                    token: token
                }
            });
            const insertData = await customers.find({"_id": data.insertedId}).toArray()
            res.status(201).send(insertData);
        } else {
            return res.status(401).send('Email already exit!');
        }

    } catch (err) {
        return res.status(401).send('Insert failed!');
    }

});

/**
 * Customer login
 */
router.post('/login', async (req, res) => {

    try {
        const {email, password} = req.body;
        const hashedPassword = getHashedPassword(password);
        const customers = await loadCustomerCollection();
        const customer = await customers.find({"email": email, "password": hashedPassword},).toArray();

        if (customer.length === 0) {
            return res.status(401).send('Login failed! Check authentication credentials');
        }

        const token = jwt.sign({
            name: customer[0].username,
            email: customer[0].email,
            manualId: customer[0].manualId
        }, "secret");
        await customers.updateOne({"_id": customer[0]._id}, {$set: {tokens: {token: token}}})
        res.status(201).send(customer);

    } catch (err) {
        return res.status(401).send('Login failed!');
    }

})


async function loadCustomerCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://inojanmaheswaran:ZywXI2Pbqxnu1Rvo@cluster0.aon9zpy.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });
    return client.db('bubble_bee').collection('customers');
}


module.exports = router;