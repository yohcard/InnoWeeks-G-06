import { auth } from "../Auth/auth.mjs";
import express from "express";
import mailjet from "node-mailjet";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const EmailRouter = express();
const mailjetClient = mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_API_SECRET
);

const contactEmail = "pv20qck@eduvaud.ch";

export const sendEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      error: "All fields are required: name, email, subject, message",
    });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email) || !emailRegex.test(contactEmail)) {
    return res.status(400).json({
      error: "Invalid email address format for 'email' or 'contactEmail'",
    });
  }

  const request = mailjetClient.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "pv20qck@eduvaud.ch",
          Name: "Dario",
        },
        To: [
          {
            Email: "pv20qck@eduvaud.ch",
            Name: "Dario",
          },
        ],
        Subject: "Greetings from Mailjet.",
        TextPart: "My first Mailjet email",
        HTMLPart:
          "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
        CustomID: "AppGettingStartedTest",
      },
    ],
  });
};
request
  .then((result) => {
    console.log(result.body);
  })
  .catch((err) => {
    console.log(err.statusCode);
  });
EmailRouter.post("/contact", auth, sendEmail);

export { EmailRouter };
