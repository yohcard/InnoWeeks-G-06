/*import { auth } from "../Auth/auth.mjs";
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
  process.env.MAILJET_API_KEY2,
  process.env.MAILJET_API_SECRET2
);

const EntrepriseMail = process.env.ENTRENPRISE_MAIL2;

export const sendEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      data: "All fields are required: name, email, subject, message",
    });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email) || !emailRegex.test(EntrepriseMail)) {
    return res.status(400).json({
      data: "Invalid email address format for 'email' or 'contactEmail'",
    });
  }
  const request = mailjetClient.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: email,
          Name: name,
        },
        To: [
          {
            Email: EntrepriseMail,
            Name: "Dario ",
          },
        ],
        Subject: subject,
        TextPart: message,
        HTMLPart: message,
        CustomID: "AppGettingStartedTest",
      },
    ],
  });

  try {
    const result = await request;
    console.log(result.body);
    res
      .status(200)
      .json({ message: "Email sent successfully", data: result.body });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
};

EmailRouter.post("/contact", auth, sendEmail);
*/
export { EmailRouter };
