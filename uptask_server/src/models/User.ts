
import mongoose from "mongoose"
import moongose,{Schema, Document} from "mongoose"

export interface IUser extends Document{
    email: string,
    password: string,
    name: string,
    confirmed: boolean
}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase:true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    confirmed: {
        type: Boolean,
        default: false,
        required: true,
    },
})

export const User = mongoose.model<IUser>('User', userSchema)
