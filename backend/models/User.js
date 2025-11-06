import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  phone:     { type: String },
  password:  { type: String, required: true },
  gender:    { type: String },
  cart:      [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name:      { type: String, required: true },
      image:     { type: String },
      price:     { type: Number, required: true },
      quantity:  { type: Number, required: true, default: 1 }
    }
  ]
}, { timestamps: true });


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});


userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
