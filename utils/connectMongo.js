import mongoose, { mongo } from "mongoose";

const connectmongo = async() => mongoose.connect(process.env.MONGO_DB)

export default connectmongo;