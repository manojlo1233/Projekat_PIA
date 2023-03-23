import mongoose from "mongoose";

const Schema = mongoose.Schema

let Preduzece = new Schema({
    ime : {
        type: String
    },
    prezime: {
        type: String
    },
    kor_ime : {
        type: String
    },
    lozinka: {
        type: String
    },
    telefon : {
        type: String
    },
    e_mail: {
        type: String
    },
    naziv : {
        type: String
    },
    adresa: {
        type: Object
    },
    PIB: {
        type: Number
    },
    maticni_broj: {
        type: Number
    },
    prvi_put: {
        type: Boolean
    },
    tip: {
        type: String
    },
    prihvaceno: {
        type: Boolean
    },
    logo: {
        type: String
    },
    narucioci: {
        type: Array
    }
})

export default mongoose.model('PreduzeceModel', Preduzece, 'Korisnici');