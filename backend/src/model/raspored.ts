import mongoose from "mongoose";

const Schema = mongoose.Schema

let Raspored = new Schema({
    preduzece:{
        type: String
    },
    objekat:{
        type: Object
    },
    sala: {
        type: Array
    },
    basta:{
        type: Array
    }
})

export default mongoose.model('RasporedModel', Raspored, 'RasporedStolova');