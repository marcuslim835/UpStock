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
            console.log(data)
            result = data.map(stock => ({
                [stock.symbol]: stock.regularMarketPrice.toFixed(2)
            }))
            ;
        });
        console.log(result);
        return result; // returns an array of objects
    } catch (error) {
        console.error(error);
    }
}

export const getHistoricalStockPrice = async (ticker, quantity, range) => {
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
                result[new Date(timestamps[i] * 1000).toString().substring(4, 15)] = prices[i] * quantity;
            }
        });

        return result;
    } catch (error) {
        console.error(error);
    }
}

export const getHistoricalValue = async (tickers, range) => { // tickers is json
    let temp = [];

    try {
        for (let [ticker, quantity] of tickers) {
            const data = await getHistoricalStockPrice(ticker, quantity, range);
            temp.push(data);
        }

        const result = temp.reduce((date, price) => {
            Object.entries(price).forEach(([key, val]) => {
                date[key] = (Math.round(((date[key] || 0) + val) * 100) / 100);
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
        url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-summary',
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
                dividendRate: data.summaryDetail.dividendRate.raw,
                dividendYield: data.summaryDetail.dividendYield.raw,
                dividendDate: data.calendarEvents.dividendDate.fmt,
                exDividendDate: data.calendarEvents.exDividendDate.fmt,
            };
        });

        return result; // returns an object with important dividend information
    } catch (error) {
        console.error(error);
    }
}

export const getKeyStatistics = async (ticker) => {
    const options = {
        method: 'GET',
        url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-summary',
        params: {symbol: ticker},
        headers: {
            'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.VUE_APP_FINANCE_API_KEY
        }
    }

    try {
        let result = {keyStatistics: "", profitability: "", shareStatistics: "", priceHistory: ""}

        await axios.request(options).then((response) => {
            const data = response.data;
            result.keyStatistics = {
                marketCap: data.summaryDetail.marketCap.fmt,
                beta: data.summaryDetail.beta.fmt,
                PE: data.summaryDetail.trailingPE.fmt,
                EPS: data.defaultKeyStatistics.trailingEps.fmt
            }

            result.profitability = {
                profitMargin: data.financialData.profitMargins.fmt,
                operatingMargin: data.financialData.operatingMargins.fmt,
                ROA: data.financialData.returnOnAssets.fmt,
                ROE: data.financialData.returnOnEquity.fmt,
            }

            result.shareStatistics = {
                volume: data.summaryDetail.volume.raw,
                avgVolume:data.summaryDetail.averageVolume.raw,
                sharesOutstanding: data.defaultKeyStatistics.sharesOutstanding.fmt,
                sharesShort: data.defaultKeyStatistics.sharesShort.fmt,
            }

            result.priceHistory = {
                high: data.summaryDetail.fiftyTwoWeekHigh.fmt,
                low: data.summaryDetail.fiftyTwoWeekLow.fmt,
                movingAverage50: data.summaryDetail.fiftyDayAverage.fmt,
                movingAverage200: data.summaryDetail.twoHundredDayAverage.fmt
            }
        });

        return result;
    } catch (error) {
        console.error(error);
    }
}