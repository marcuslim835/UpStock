import axios from 'axios';

// ticker examples: "AAPL", "AAPL,AMD"
export const getStockPrice = async (ticker) => { // can be used for multiple stocks
    const options = {
        method: 'GET',
        url: 'https://yh-finance.p.rapidapi.com/market/v2/get-quotes',
        params: {symbols: ticker, region: 'US'},
        headers: {
          'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
          'x-rapidapi-key': process.env.VUE_APP_FINANCE_API_KEY
        }
    };

    try {
        let result = [];

        await axios.request(options).then((response) => {
            const data = response.data.quoteResponse.result;
            result = data.map(stock => ({
                [stock.symbol]: stock.regularMarketPrice.toFixed(2)
            }));
        });
        console.log(result);
        return result; // returns an array of objects
    } catch (error) {
        console.error(error);
    }
}

export const getHistoricalStockPrice = async (ticker, range) => {
    const options = {
        method: 'GET',
        url: 'https://yh-finance.p.rapidapi.com/stock/v3/get-chart',
        params: {interval: '1mo', symbol: ticker, range: range, region: 'US'},
        headers: {
            'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
            'x-rapidapi-key': process.env.VUE_APP_FINANCE_API_KEY
        }
    };

    try {
        let result = {}
        await axios.request(options).then((response) => {
            const data = response.data;
            const timestamps = data.chart.result[0].timestamp;
            const prices = data.chart.result[0].indicators.quote[0].close;

            for (let i = 0; i < 12; i++) {
                result[new Date(timestamps[i] * 1000).toUTCString().substring(5, 16)] = prices[i];
            }
        });

        return result;
    } catch (error) {
        console.error(error);
    }
}

export const getHistoricalPL = async (tickers, range) => {
    let temp = [];

    try {
        for (let i = 0; i < tickers.length; i++) {
            const data = await getHistoricalStockPrice(tickers[i], range);
            temp.push(data);
        }

        const result = temp.reduce((date, price) => {
            Object.entries(price).forEach(([key, val]) => {
                date[key] = Math.round(((date[key] || 0) + val) * 100) / 100;
            });
            return date;
        });

        return result;
    } catch (error) {
        console.error(error);
    }
}

export const getDividendInformation = async (ticker) => { // only a single stock
    const options = {
        method: 'GET',
        url: 'https://yh-finance.p.rapidapi.com/market/v2/get-summary',
        params: {symbol: ticker, region: 'US'},
        headers: {
            'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
            'x-rapidapi-key': process.env.VUE_APP_FINANCE_API_KEY
        }
    };

    try {
        let result = [];

        await axios.request(options).then((response) => {
            const data = response.data;
            result = {
                dividend: data.summaryDetail.dividendRate.raw,
                dividendDate: data.calendarEvents.dividendDate.fmt,
                exDividendDate: data.calendarEvents.exDividendDate.fmt,
            };
        });

        return result; // returns an object with important dividend information
    } catch (error) {
        console.error(error);
    }
}