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

app.use('/', (req, res) => {
    res.send('Use With `https://ohlc-tw-bot.herokuapp.com/api/data/?symbol=UNISWAP:HEXUSDT&period=1D`')
})


app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000');
});