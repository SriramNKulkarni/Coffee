import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import jwt from "jasonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      index: true,
    },
    fullname: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email"], // Email validation
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    orderHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  { timestamps: true }
);



// **Pre-save Hook to Hash Password**
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// **Method to Compare Passwords**
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateaccessToken = function(){
  jwt.sign(
    {
      _id : this._id,
      email : this.email,
      fullname : this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_SECRET
    }
  )
}
userSchema.methods.generaterefreshToken = function(){
  jwt.sign(
    {
      _id : this._id,
    },
    process.env.REFRESH_TOKEN_SECRETT,
    {
      expiresIn: process.env.REFRESH_TOKEN_SECRET
    }
  )
}

const User = mongoose.model("User", userSchema);

module.exports = User;
