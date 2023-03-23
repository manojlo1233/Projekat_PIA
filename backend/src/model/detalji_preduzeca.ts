import mongoose from "mongoose";

const Schema = mongoose.Schema

let Detalji_preduzeca = new Schema({
    vlasnik: {
        type: String
    },
    kategorija: {
        type: String
    },
    sifre_delatnosti: {
        type: Array
    },
    PDV: {
        type: Boolean
    },
    ziro_racuni: {
        type: Array
    },
    broj_magacina: {
        type : Number
    },
    magacini: {
        type: Array
    },
    broj_fis_kasa:{
        type: Number
    },
    fis_kase: {
        type: Array
    }
})

export default mongoose.model('DetaljiModel', Detalji_preduzeca, 'PreduzeceDetalji');