const express = require('express');
const getData = require('./app').getData;
const market = require('./app').market;
const readLastData = require('./modules/readLastData');
const app = express();


app.get('/api/data/', (req, res) => {
    const queries = req.query;
    if (queries.hasOwnProperty('symbol') && queries.hasOwnProperty('period')) {
        getData(queries.symbol, queries.period);
        setTimeout(() => {
            // market.end()
            // console.log(queries.symbol, queries.period, 'server');
            let lastData = readLastData()[queries.symbol];
            res.json(lastData);
        }, 2000);
    }
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});