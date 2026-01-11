import mongoose from "mongoose";
import { DATABASE_URL } from "../utils/env";

const connect = async () => {
    try {
        await mongoose.connect(DATABASE_URL, {
            dbName: "sipeting",
        });
        return Promise.resolve("Database connected");
    } catch (err) {
        return Promise.reject(err);
    }
};

export default connect;