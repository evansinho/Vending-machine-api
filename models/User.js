import mongoose from 'mongoose';
 
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  deposit: {
    type: Number,
  },
  role: {
    type: String,
    default: 'buyer',
    enum: ["buyer", "seller"]
  },
});
 
export default mongoose.model('user', UserSchema);
