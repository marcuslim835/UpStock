import firebaseApp from './firebaseAccessor.js'
import {getFirestore} from 'firebase/firestore'
import { getDoc, doc } from 'firebase/firestore';
const db = getFirestore(firebaseApp);

//INDEX ACCESS TO MAP
export const NAME_POS = 0;
export const TYPE_POS = 1;
export const BROKERS_POS = 2;
export const STOCK_QTY = 'qty';
export const STOCK_PRICE = 'price';


/*Returns MAP {ticker: [stockName,type,mapBroker], . . . }
  where mapBroker = {brokerName : {price : x, qty : y}, . . .}
*/
export const getAllHoldings = async (userID) => { 
    try {
        var docRef = doc(db, userID,"holdings") //userID as placeholder for curr.uid
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            let dict =  docSnap.data()
            var keys= Object.keys(dict)
            const mapper = new Map();
            for (const ticker of keys) {
                var stockName = dict[ticker]['name']
                var mapBroker = dict[ticker]['broker']
                var type = dict[ticker]['type']
                var arr = [stockName,type,mapBroker]
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
        var docRef = doc(db, userID,"holdings") //userID as placeholder for curr.uid
        const docSnap = await getDoc(docRef)
        console.log(docSnap.data());
        if (docSnap.exists()) {
            let dict =  docSnap.data()
            var keys= Object.keys(dict)

            const mapper = new Map();
            for (const ticker of keys) {
                let qty = 0
                var mapBroker = dict[ticker]['broker']
                for (const maps of Object.values(mapBroker)) {
                    qty += maps[STOCK_QTY] 
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
        var docRef = doc(db, userID,"holdings") //userID as placeholder for curr.uid
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

