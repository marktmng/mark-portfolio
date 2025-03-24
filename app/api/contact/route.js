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
        user: process.env.GMAIL_USER, // Use environment variable
        pass: process.env.GMAIL_PASS, // Use environment variable
      },
    });

    // Email Content
    const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER, // Use environment variable
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
    console.error("Error sending email:", error); // Log the error for debugging
    return NextResponse.json({
      success: false,
      message: "Error sending email",
      error: error.message, // Include the error message in the response
    });
  }
}
