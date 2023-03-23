import mongoose from "mongoose";

const Schema = mongoose.Schema

let Magacin = new Schema({
    identifikator:{
        type: String
    },
    naziv: {
        type: String
    },
    artikli:{
        type: Array
    }

})

export default mongoose.model('MagacinModel', Magacin, 'Magacin');