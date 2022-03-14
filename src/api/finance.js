import axios from 'axios';

// ticker examples: "AAPL", "AAPL,AMD"
export const getStockPrice = async (ticker) => { // can be used for multiple stocks
    const options = {
        method: 'GET',
        url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes',
        params: {symbols: ticker, region: 'US'},
        headers: {
          'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
          'x-rapidapi-key': process.env.VUE_APP_FINANCE_API_KEY
        }
    };

    try {
        let result = [];

        await axios.request(options).then((response) => {
            const data = response.data.quoteResponse.result;
            result = data.map(stock => ({
                [stock.symbol]: stock.regularMarketPrice
            }));
        });
        console.log(result);
        return result; // returns an array of objects
    } catch (error) {
        console.error(error);
    }
}

export const getDividendInformation = async (ticker) => { // only a single stock
    const options = {
        method: 'GET',
        url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary',
        params: {symbol: ticker, region: 'US'},
        headers: {
            'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
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