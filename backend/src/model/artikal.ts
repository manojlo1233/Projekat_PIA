import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Artikal = new Schema({
    preduzece: {
        type: String
    },
    sifra:{
        type: Number
    },
    naziv: {
        type: String
    },
    jedinica_mere: {
        type: String
    },
    poreska_stopa:{
        type: String
    },
    tip: {
        type: String
    },
    dopunski_podaci: {
        type: Object
    },
    slika: {
        type: String
    },
    kategorija: {
        type: Object
    },
    ima_kategoriju:{
        type: Boolean
    }

})

export default mongoose.model('ArtikalModel', Artikal, 'Artikal');