import firebaseApp from './firebaseAccessor.js'
import {deleteField, getFirestore, setDoc, updateDoc} from 'firebase/firestore'
import { getDoc, doc } from 'firebase/firestore';
const db = getFirestore(firebaseApp);

//INDEX ACCESS TO MAP
export const NAME_POS = 0;
export const TYPE_POS = 1;
export const BROKERS_POS = 2;
export const STOCK_QTY = 'qty';
export const STOCK_PRICE = 'price';
export const TYPE_MAP = {'Tech':0,'REIT':1,'Finance':2,'Energy':3,'Healthcare':4,'Industrials':5,'OTHERS':6}
export const LABEL_TYPES = ['Tech','REIT','Finance','Energy','Healthcare','Industrials','OTHERS']

/*Returns MAP {ticker: [stockName,type,mapBroker], . . . }
  where mapBroker = {brokerName : {price : x, qty : y}, . . .}
*/
export const getAllHoldings = async (userID) => { 
    try {
        var docRef = doc(db, userID,"holdings") //userID as placeholder for curr.uid
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            const dict =  docSnap.data()
            const keys= Object.keys(dict)
            const mapper = new Map();
            console.log("FROM HOLDINGSACCESS: ",keys)
            console.log("FROM HOLDINGSACCESS: ",dict)

            for (const ticker of keys) {
                let stockName = dict[ticker]['name']
                let mapBroker = dict[ticker]['broker']
                let type = dict[ticker]['type']
                let arr = [stockName,type,mapBroker]
                mapper.set(ticker,arr)
            }
            //console.log(mapper)
            return mapper 
        } else {
            console.log("Fail to load firebase");
            return null
        }
    } catch (error) {
        console.error(error);
    }
}
/*Returns MAP {ticker: qty , . . . }
*/
export const getHoldingsQty = async (userID) => { 
    try {
        const docRef = doc(db, userID,"holdings") //userID as placeholder for curr.uid
        const docSnap = await getDoc(docRef)
        console.log(docSnap.data());
        if (docSnap.exists()) {
            const dict =  docSnap.data()
            const keys= Object.keys(dict)

            const mapper = new Map();
            for (const ticker of keys) {
                let qty = 0
                let mapBroker = dict[ticker]['broker']
                for (const maps of Object.values(mapBroker)) {
                    qty += parseInt(maps[STOCK_QTY]) 
                }
                mapper.set(ticker,qty)
            }
            //console.log(mapper)
            return mapper 
        } else {
            console.log("Fail to load firebase");
        }
    } catch (error) {
        console.error(error);
    }
}



//Obtain Agg price
export const updateAggPrice = async (userID,ticker) => { 
    try {
        const docRef = doc(db, userID,"holdings") //userID as placeholder for curr.uid
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            let dict =  docSnap.data()
            let qty = 0
            let sum = 0
            let mapBroker = dict[ticker]['broker']
            for (const map of Object.values(mapBroker)) {
                console.log(map)
                qty += (map[STOCK_QTY])
                sum += (map[STOCK_PRICE]) * qty
            }
            let aggPrice = sum/qty
            //update aggPrice in fb TODO
            console.log(aggPrice.toFixed(2))
            return aggPrice.toFixed(2) 
        } else {
            console.log("Fail to load firebase");
        }
    } catch (error) {
        console.error(error);
    }
}

export const addData = async (userID, ticker, stockName, brokerName, price, quantity, tag) => {
    try {
        const docRef = doc(db, userID, "holdings");
        const docSnapshot = await getDoc(docRef);
        if (!docSnapshot.exists()) {
            const nDoc = await setDoc(docRef, {[ticker]: {broker: {[brokerName]: {qty: quantity, price: price}}, name: stockName, type: tag}});
            console.log("ADD DATA OF STOCK/INVESTMENT IF DUN EXIST: ", nDoc);
        } else {
            const dict = docSnapshot.data();
            console.log(typeof dict);
           
            console.log("ADD DATA (IN DICT): ", ticker in dict);
            if (ticker in dict) {
                const currBrokers = dict[ticker]["broker"];

                let nBrokerObj = {};
                nBrokerObj[brokerName] = {qty: quantity, price: price};
                for (let [key,value] of Object.entries(currBrokers)) {
                    nBrokerObj[key] = value;
                    console.log("INSIDE ADDDATA COPY LOOP: ", nBrokerObj);
                }
                
                const updatedData = {broker: nBrokerObj, name: stockName, type: tag};
                console.log(updatedData);

                // Delete current outdated data from firebase
                // await updateDoc(docRef, {[ticker] : deleteField()});
                // Add back updated data
                dict[ticker] = updatedData;
                
            } else {
                dict[ticker] = {broker: {[brokerName]: {qty: quantity, price: price}}, name: stockName, type: tag};  
            }
    
            await setDoc(docRef, dict)
            
        }
        
    }
    catch (error) {
        console.log("ERRORRRRRRRR")
        console.error(error);
    }
}

export const delData = async (userID, ticker, brokerName) => {
    try {
        var docRef = doc(db, userID, "holdings")
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            const dict = docSnap.data()
            const currStock = dict[ticker]
            const currStockBrokers = currStock["broker"]

            delete currStockBrokers[brokerName];
            console.log(currStockBrokers)
            console.log(Object.keys(currStockBrokers).length)
            if (Object.keys(currStockBrokers).length > 0) {
                console.log("RAN DELETE STOCK > 0")
                const updatedData = {broker: currStockBrokers, name: currStock["name"], type: currStock["type"]};
                await updateDoc(docRef, {[ticker] : deleteField()});
                dict[ticker] = updatedData;
                await setDoc(docRef, dict)
            } else {
                await updateDoc(docRef, {[ticker] : deleteField()});
            }
        }
    } 
    catch (error) {
        console.error(error);
    }
    
}

