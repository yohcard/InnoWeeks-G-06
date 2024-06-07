import Mailjet from "node-mailjet";

const apiKey = "1ef676690beef52b3b6ad52bea377ef6";
const apiSecret = "646038b44bfb396b6fc9ab14f03c5d99";
if (!apiKey || !apiSecret) {
  console.log(apiKey);
  console.log(apiSecret);
  throw new Error("Mailjet API_KEY and API_SECRET are required");
}
const mailjetClient = Mailjet.apiConnect(apiKey, apiSecret);

export { mailjetClient };
