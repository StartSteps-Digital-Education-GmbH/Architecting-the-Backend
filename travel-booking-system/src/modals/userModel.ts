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
    age: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('find',(next)=> {
    console.log('find data from database');
    next();
});

const User  = mongoose.model<IUser>('User', userSchema)
export default User;
export {userSchema};