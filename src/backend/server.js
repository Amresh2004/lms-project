import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// connect DB
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", userRoutes);


// ✅ Mail Transporter (use env variables)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yourgmail@gmail.com",      // your email
    pass: "your_app_password"         // NOT normal password
  }
});

// ✅ Send Mail API
app.post("/send-mail", async (req, res) => {
  const { name, email, subject, message } = req.body;
 // validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields required" });
  }

 try {
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: "atsscollege@gmail.com", // change to real college mail
      replyTo: email,
      subject: subject || "New Contact Message",
      html: `
        <h3>New Contact Form Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b> ${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Email sent" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});

// server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

