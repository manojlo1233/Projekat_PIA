import mongoose from "mongoose";

const Schema = mongoose.Schema

let Fiskasa = new Schema({
    lokacija: {
        type: Object
    },
    tip: {
        type: String
    },
    artikli:{
        type: Array
    },
    naziv:{
        type: String
    }
})

export default mongoose.model('FisKasaModel', Fiskasa, 'FiskalnaKasa');