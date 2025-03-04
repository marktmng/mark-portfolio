import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { firstname, lastname, email, phone, subject, message } =
      await req.json();

    // Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mailsareaccepting@gmail.com", // Your Gmail
        pass: "jnat kxjs bjgx nfnk", // Generate App Password from Google
      },
    });

    // Email Content
    const mailOptions = {
      from: email,
      to: "mailsareaccepting@gmail.com", // Your Gmail
      subject: `New Message: ${subject}`,
      text: `${message}\n\nName: ${firstname} ${lastname}\nEmail: ${email}\nPhone: ${phone}`,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error sending email",
      error,
    });
  }
}
