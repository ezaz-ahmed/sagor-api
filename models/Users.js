import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 15,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    select: false,
  },
  role: {
    type: Number,
    required: true,
    default: 0,
  },
});

userSchema.plugin(mongoosePaginate);
export default mongoose.model("User", userSchema);
