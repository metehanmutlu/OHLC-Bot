const readLastData = require('./modules/readLastData')
const updateData = require('./modules/updateLastData')
const marketAPI = require('@mathieuc/tradingview');



const market = marketAPI(false);


// {
//     '1' | '3' | '5' | '15' | '30' | '45'
//     | '60' | '120' | '180' | '240'
//     | '1D' | '1W' | '1M'
// }

// const getData = async (symbol, period) => {
//     market.on('logged', () => {
//         market.initChart({
//             symbol: symbol,
//             period: period,
//             range: 1,
//             indicators: [
//                 { name: 'OHLC-EraSafir#1755', id: 'PUB;d968870772264aaeb227ee7e43ebaea3', version: '1' }
//             ]
//         }, (periods) => {
//             const indicator = periods[0]['OHLC-EraSafir#1755'];
//             if (indicator) {
//                 console.log(indicator);
//                 let lastData = readLastData();
//                 lastData[symbol] = indicator;
//                 updateData(lastData);
//                 market.end()
//             } else {
//                 console.log('No Indicator');
//             }
//         })
//     })
//     market.on('error', (err) => {
//         console.log('Error =>', err);
//     })
// }

const getData = (symbol, period) => {
    market.initChart({
        symbol: symbol,
        period: period,
        range: 1,
        indicators: [
            { name: 'OHLC-EraSafir#1755', id: 'PUB;d968870772264aaeb227ee7e43ebaea3', version: '1' }
        ]
    }, (periods) => {
        const indicator = periods[0]['OHLC-EraSafir#1755'];
        if (indicator) {
            // console.log(indicator);
            let lastData = readLastData();
            lastData[symbol] = indicator;
            updateData(lastData);
            // market.end()
        } else {
            // console.log('No Indicator Data');
        }
    })
        .catch((error) => {
            console.log('Error =>', error);
        })
}


// getData('BNBUSDT', '1D')
module.exports = { getData, market };