const nodemailer = require("nodemailer");

// Create a transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Use the Gmail service
  auth: {
    user: "your-email@gmail.com", // Your Gmail address
    pass: "your-password",         // Your Gmail password (or an App Password)
  },
});


 const  mailer = () => {
// Define email options
const mailOptions = {
  from: "your-email@gmail.com", // Sender address
  to: "recipient@example.com",   // List of recipients
  subject: "Hello from Nodemailer", // Subject line
  text: "This is a test email sent using Nodemailer with Gmail.", // Plain text body
  // html: "<p>This is a test email sent using <b>Nodemailer</b> with Gmail.</p>", // HTML body
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log("Error sending email: ", error);
  }
  console.log("Email sent: " + info.response);
});
}


module.exports = mailer

