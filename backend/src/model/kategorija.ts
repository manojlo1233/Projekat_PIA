import mongoose from "mongoose";

const Schema = mongoose.Schema

let Kategorija = new Schema({
    preduzece:{
        type: String
    },
    kategorija:{
        type: String
    },
    potkategorije:{
        type: Array
    }
})

export default mongoose.model('KatModel', Kategorija, 'Kategorija')