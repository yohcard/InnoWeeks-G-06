import Mailjet from "node-mailjet";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const apiKey = process.env.MAILJET_API_KEY;
const apiSecret = process.env.MAILJET_API_SECRET;

if (!apiKey || !apiSecret) {
  console.log(apiKey);
  console.log(apiSecret);
  throw new Error("Mailjet API_KEY and API_SECRET are required");
}

const mailjetClient = Mailjet.apiConnect(apiKey, apiSecret);

export { mailjetClient };
