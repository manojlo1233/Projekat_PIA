import mongoose from "mongoose";

const Schema = mongoose.Schema

let Kupac = new Schema({
    kor_ime:{
        type: String
    },
    lozinka:{
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    telefon:{
        type: Number
    },
    broj_licne: {
        type: Number
    },
    tip: {
        type: String
    }
})

export default mongoose.model('KupacModel', Kupac, 'Korisnici');