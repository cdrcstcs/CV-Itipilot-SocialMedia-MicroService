import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: {type:String, unique:true},
    password: String,
    imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' }, 
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    viewedProfile: Number,
    hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }], 
    phone: Number,
    userType: String,
    longtitude: Number,
    latitude: Number,
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;
