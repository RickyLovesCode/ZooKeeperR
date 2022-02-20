const fs = require('fs');
const path = require('path');
const express = require('express');
const { animals } = require('./data/animals');

const res = require('express/lib/response');
const { type } = require('express/lib/response');

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const PORT = process.env.PORT || 3001;
const app = express();

///////////////////////////////////////////////////////////
//this 'parse incoming string's && Arrays (data) **meaning to covert incoming client side data (Intercept POST request) before the 'callback func' ** converts HTTP into a JSON obj

// transmit 'html/css/js' middleware
app.use(express.static('public'));

//parse any incoming string or array
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

