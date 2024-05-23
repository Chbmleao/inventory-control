import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

export async function mongooseConnect() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
