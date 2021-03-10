const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);
const msg = {
  to: "viraat.laldas@gmail.com", // Change to your recipient
  from: "viraat.laldas@gmail.com", // Change to your verified sender
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });
