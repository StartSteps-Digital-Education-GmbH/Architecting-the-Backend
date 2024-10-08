import mongoose, {Schema, Document} from "mongoose";

interface IUser extends Document {
    id: number;
    name: string;
    email: string;
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    //array of bookings
})

const User  = mongoose.model<IUser>('User', userSchema)
export default User;