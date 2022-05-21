import { Admin } from "../types/Constants";

const DB_URL = ""; // Replace with your database url (mongoDB realm)
const DISCORD_WEBHOOK = ""; // Replace with your discord webhook url
const ADMINS = [{
    username: "",
    password: "",
}] as Admin[]; // Replace with your admin accounts

export {
    DB_URL,
    DISCORD_WEBHOOK,
    ADMINS,
};