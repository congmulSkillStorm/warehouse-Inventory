import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/warehouse-inventory', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export default mongoose.connection;
