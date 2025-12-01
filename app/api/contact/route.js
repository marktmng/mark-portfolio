import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { firstname, lastname, email, phone, subject, company, message } =
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
        <tr>
          <td style="border: 1px solid #171717;"><strong>Company</strong></td>
          <td style="border: 1px solid #171717;">${company}</td>
        </tr>
      </table>
    `;

    // reciever email options
    const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER, // Use environment variable
      subject: `New Message: ${subject}`,
      // text: `${message}\n\nName: ${firstname} ${lastname}\nEmail: ${email}\nPhone: ${phone}`,
      html: htmlContent, // Send HTML email instead of plain text
    };

    // confirmation email to sender
    const confirmationMail = {
      from: `"Mark Tamang" <${process.env.GMAIL_USER}>`, // Use environment variable
      to: email,
      subject: "Thank you for reaching Mark!",
      html: `
      <p style="color: #171717">Kia Ora ${firstname},
      <br/>Thank you for reaching out to me. I have received your message and will get back to you as soon as possible.</p>
        <strong text-color: #171717>Ngā mihi nui / Best regards,</strong>
        <br/>
        <p style="color: #171717">Mark Tamang
        <br/>(+64) 22 380 3511
        <br/>${process.env.GMAIL_USER}
        <br/>marktmg.com</p>`,
    };

    // Email
    await transporter.sendMail(mailOptions); // receive email
    await transporter.sendMail(confirmationMail); // confirmation email to sender

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
