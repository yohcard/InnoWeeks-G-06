import { auth } from "../Auth/auth.mjs";
import express from "express";
import { mailjetClient } from "../Auth/api_key.mjs";

const EmailRouter = express.Router();
const EntrepriseMail = "pv20qck@eduvaud.ch";

EmailRouter.post("/", async (req, res) => {
  const { userMail, username, subject, message } = req.body;
  if (!userMail || !username || !subject || !message) {
    return res.status(400).json({
      error: "All fields are required: userEmail, userName, subject, message",
    });
  }

  const request = mailjetClient.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: userMail,
          Name: username,
        },
        To: [
          {
            Email: EntrepriseMail,
            Name: "App_Tuto",
          },
        ],
        Subject: subject,
        TextPart: message,
        HTMLPart: `<p>${message}</p>`,
      },
    ],
  });

  try {
    const result = await request;
    res
      .status(200)
      .json({ message: "Email sent successfully", data: result.body });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
});

export { EmailRouter };
