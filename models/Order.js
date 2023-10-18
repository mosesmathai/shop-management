import { Schema, model, models } from "mongoose"

const OrderSchema = new Schema({
  line_items: Object,
  paymentMode: String,
}, {
  timestamps: true,
});

export const Order = models?.Order || model('Order', OrderSchema);