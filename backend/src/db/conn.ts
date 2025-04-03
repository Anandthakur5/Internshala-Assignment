import mongoose from 'mongoose';

const MONGODB_URL = 'mongodb://localhost:27017/internshala'

const db = async() => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("Database is connected");
    } catch (error) {
        console.log(error);
    }
}

export default db;