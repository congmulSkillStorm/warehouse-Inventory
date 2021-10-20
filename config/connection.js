import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/warehouse-inventory-v2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export default mongoose.connection;
