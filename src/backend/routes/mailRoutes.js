import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/send-mail", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // ✅ Create transporter (Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "amreshwarad1234@gmail.com",       // 👉 your email
        pass: "slsnhtorjtpelcoq"          // 👉 app password (not normal password)
      }
    });

    // ✅ Mail options
    const mailOptions = {
      from: email,
      to: "yourgmail@gmail.com", // 👉 where you want to receive
      subject: subject || "New Contact Message",
      html: `
        <h3>New Message from Contact Form</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    };

    // ✅ Send mail
    await transporter.sendMail(mailOptions);

    res.json({ message: "Email sent successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error sending email" });
  }
});

export default router;