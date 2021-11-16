import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const numberSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    min: 10,
    max: 15,
  },
  paymentMethod: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  limit: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
});

numberSchema.plugin(mongoosePaginate);
export default mongoose.model("Number", numberSchema);
