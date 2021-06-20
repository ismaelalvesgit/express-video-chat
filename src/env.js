import dotenv from "dotenv";
dotenv.config();

const url =  process.env.SERVER_URL  || "http://localhost:3000";
export default {
    env: process.env.NODE_ENV || "development",
    timezone: process.env.TIME_ZONE || "America/Fortaleza",
    server:{
        url,
        active: process.env.SERVER_ACTIVE === "true",
        port: parseInt(process.env.SERVER_PORT || "3000"),
        bodyLimit: process.env.SERVER_BODY_LIMIT || "500kb"
    }
};