import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, index: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false},
})
// model 'User' - is what we save to DB 
const UserModel = mongoose.model('User', userSchema);
export default UserModel;
