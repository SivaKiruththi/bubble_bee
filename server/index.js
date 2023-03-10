const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

//Middleware

app.use(bodyParser.json());
app.use(cors());

const adminUsers = require('./routes/api/adminUsers');
app.use('/api/admin', adminUsers);

const customers = require('./routes/api/customers');
app.use('/api/customer', customers);

const categories = require('./routes/api/categories');
app.use('/api/categories', categories);

const brands = require('./routes/api/brands');
app.use('/api/brands', brands);

const products = require('./routes/api/products');
app.use('/api/products', products);

const purchases = require('./routes/api/purchases');
app.use('/api/purchases', purchases);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))