import mongoose, { Schema } from "mongoose";
const flightSchema = new Schema({
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        requred: true
    }
});
const Flight = mongoose.model('Flight', flightSchema);
export default Flight;
