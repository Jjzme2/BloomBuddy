import sgMail from "@sendgrid/mail";

import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const developerEmail = process.env.DEVELOPER_EMAIL;

const sendEmail = (to, subject, text) => {
  const msg = {
    to,
    from: developerEmail,
    subject,
    text,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent successfully to: ", to);
    })
    .catch((error) => {
      console.error("Error sending email:", error);
    });
};

export { sendEmail };
