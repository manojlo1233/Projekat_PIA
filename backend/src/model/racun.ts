import mongoose from "mongoose";

const Schema = mongoose.Schema

let Racun = new Schema({
    preduzece: {
        type: String
    },
    datum: {
        type: Date
    },
    stavke:{
        type: Array
    },
    zatvoren: {
        type: Boolean
    },
    placanje:{
        type: Object
    },
    sto: {
        type: Number
    }
})

export default mongoose.model('RacunModel', Racun, 'Racun');