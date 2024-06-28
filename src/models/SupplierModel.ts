import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  supplierName: {
    type: String,
    required: true,
    unique: true,
  },
  supplierPhoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  supplierEmail: {
    type: String,
    unique: true,
  },
  supplierDeliverables: {
    type: [String],
    required: true,
  },
});

const Supplier = mongoose.model("Supplier", supplierSchema);
export default Supplier;
