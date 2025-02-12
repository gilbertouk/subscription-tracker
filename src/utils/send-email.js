import dayjs from "dayjs";

import { emailTemplates } from "./email-templates.js";
import transporter, { accountEmail } from "../config/nodemailer.js";

export const sendReminderEmail = async ({ to, type, subscription }) => {
  if (!to || !type)
    throw new Error("Missing required parameters to send reminder email");

  const template = emailTemplates.find((t) => t.label === type);

  if (!template) throw new Error("Invalid email type");

  const mailInfo = {
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate).format("MMM D, YYYY"),
    planName: subscription.name,
    price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
    paymentMethod: subscription.paymentMethod,
  };

  const message = template.generateBody(mailInfo);
  const subject = template.generateSubject(mailInfo);

  const mailOptions = {
    from: accountEmail,
    to,
    subject,
    html: message,
  };

  transporter.sendMail(mailOptions, (error, result) => {
    if (error) console.error("Error sending reminder email:", error);

    console.log("Reminder email sent successfully:", result);
  });
};
