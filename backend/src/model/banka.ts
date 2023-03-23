import mongoose from "mongoose";

const Schema = mongoose.Schema

let Banka = new Schema({
    id: {
        type: Number
    },
    naziv:{
        type: String
    }
})

export default mongoose.model('BankaModel', Banka, 'Banke');