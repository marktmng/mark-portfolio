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
      <table cellpadding="10" cellspacing="0" style="border-collapse: collapse; border: 1px solid #171717;">
        <tr style="background-color: #171717; color: #fac70f;">
          <th align="left">Field</th>
          <th  align="left">Details</th>
        </tr>
        <tr>
          <td style="border: 1px solid #171717;"><strong>Name</strong></td>
          <td style="border: 1px solid #171717;">${firstname} ${lastname}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #171717;"><strong>Email</strong></td>
          <td style="border: 1px solid #171717;">${email}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #171717;"><strong>Phone</strong></td>
          <td style="border: 1px solid #171717;">${phone}</td>
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
