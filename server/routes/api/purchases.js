const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

/**
 * test
 */
router.get('/test', async (req, res) => {
    const manualId = "CT" + Date.now().toString(36) + Math.random().toString(36).substr(2);
    res.send(manualId);
});


/**
 * get all
 */
router.post('/getAll', async (req, res) => {
    const rows = await loadCollection();
    res.send(await rows.find({"customerEmail":req.body.email}).toArray());
});

/**
 * store
 */
router.post('/', async (req, res) => {
    try {
        const manualId = "PH" + Date.now().toString(36) + Math.random().toString(36).substr(2);
        const rows = await loadCollection();
        await rows.insertOne({
            manualId: manualId,
            product: req.body.product,
            amount: req.body.amount,
            balance: req.body.amount,
            customerEmail: req.body.customerEmail,
            createdAt: new Date(),
        });
        res.status(201).send('Success');
    } catch (err) {
        return res.status(401).send('Insert failed!');
    }
});

/**
 * get
 */
router.get('/:id', async (req, res) => {
    const rows = await loadCollection();
    res.send(await rows.find({"manualId": req.params.id}).toArray());
});

/**
 * update
 */
router.put('/', async (req, res) => {
    const rows = await loadCollection();
    await rows.updateOne({"manualId": req.body.manualId}, {$set: {product: req.body.product,amount: req.body.amount,balance: req.body.balance}})
    res.status(201).send();
});

/**
 * delete
 */
router.delete('/:id', async (req, res) => {
    const rows = await loadCollection();
    await rows.deleteOne({"manualId": req.params.id})
    res.status(201).send();
});


async function loadCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://inojanmaheswaran:ZywXI2Pbqxnu1Rvo@cluster0.aon9zpy.mongodb.net/?retryWrites=true&w=majority', {

    });
    return client.db('bubble_bee').collection('purchases');
}


module.exports = router;