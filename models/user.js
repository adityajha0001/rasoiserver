import { string } from "joi";
import mongoose from "mongoose";
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: { type: String, require: true, unique:true },
    passwor: { type: String, require:true },
},{ timestamps: true });


export default mongoose.model('User', userSchema,'users');
