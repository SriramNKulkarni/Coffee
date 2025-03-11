
import mongoose,{Schema} from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
      required: true,
    },
    deliveryDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.plugin(mongooseAggregatePaginate)

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
