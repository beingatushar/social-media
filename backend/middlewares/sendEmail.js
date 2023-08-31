const nodeMailer = require("nodemailer");

exports.sendEmail = async (options) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "4cf1d908dcf2b8",
        pass: "04819b13d36af3"
      }
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: options.email,
      subject: options.subject,
    };

    if (options.text) {
      mailOptions.text = options.text;
    }

    if (options.html) {
      mailOptions.html = options.html;
    }

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Failed to send email.");
  }
};
