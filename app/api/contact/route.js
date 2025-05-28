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
    // HTML Email Content with Table
    const htmlContent = `
      <p>${message.replace(/\n/g, "<br>")}</p>
      <br />
      <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">
        <tr style="background-color: #f2f2f2;">
          <th align="left">Field</th>
          <th align="left">Details</th>
        </tr>
        <tr>
          <td><strong>Name</strong></td>
          <td>${firstname} ${lastname}</td>
        </tr>
        <tr>
          <td><strong>Email</strong></td>
          <td>${email}</td>
        </tr>
        <tr>
          <td><strong>Phone</strong></td>
          <td>${phone}</td>
        </tr>
      </table>
    `;

    // Email Content
    const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER, // Use environment variable
      subject: `New Message: ${subject}`,
      // text: `${message}\n\nName: ${firstname} ${lastname}\nEmail: ${email}\nPhone: ${phone}`,
      html: htmlContent, // Send HTML email instead of plain text
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
