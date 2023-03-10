const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

/**
 * get all
 */
router.post('/getAll', async (req, res) => {
    const rows = await loadCollection();
    res.send(await rows.find({"customerEmail": req.body.email}).toArray());
});

/**
 * store
 */
router.post('/', async (req, res) => {
    try {
        const manualId = "BR" + Date.now().toString(36) + Math.random().toString(36).substr(2);
        const rows = await loadCollection();
        await rows.insertOne({
            manualId: manualId,
            name: req.body.name,
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
    await rows.updateOne({"manualId": req.body.manualId}, {$set: {name: req.body.name}})
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
        useNewUrlParser: true
    });
    return client.db('bubble_bee').collection('brands');
}


module.exports = router;