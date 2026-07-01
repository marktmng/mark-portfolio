import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { firstname, lastname, email, phone, company, subject, message } =
      await req.json();

    const htmlContent = `
      <div style="font-family:Arial,sans-serif;color:#171717;">
        <h2 style="margin-bottom:20px;">New Contact Form Submission</h2>

        <p style="font-size:16px;">
          ${message.replace(/\n/g, "<br>")}
        </p>

        <br>

        <table cellpadding="10" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:700px;border:1px solid #171717;">

          <tr style="background:#171717;color:#fac70f;">
            <th align="left">Field</th>
            <th align="left">Details</th>
          </tr>

          <tr>
            <td style="border:1px solid #171717;"><strong>Name</strong></td>
            <td style="border:1px solid #171717;">${firstname} ${lastname}</td>
          </tr>

          <tr>
            <td style="border:1px solid #171717;"><strong>Email</strong></td>
            <td style="border:1px solid #171717;">${email}</td>
          </tr>

          <tr>
            <td style="border:1px solid #171717;"><strong>Phone</strong></td>
            <td style="border:1px solid #171717;">${phone || "-"}</td>
          </tr>

          <tr>
            <td style="border:1px solid #171717;"><strong>Company</strong></td>
            <td style="border:1px solid #171717;">${company || "-"}</td>
          </tr>

          <tr>
            <td style="border:1px solid #171717;"><strong>Subject</strong></td>
            <td style="border:1px solid #171717;">${subject}</td>
          </tr>

        </table>

      </div>
    `;

    await resend.emails.send({
      from: "Mark Tamang <mark@pakhreen.com>",
      to: "mark@pakhreen.com",
      replyTo: email,
      subject: `New Portfolio Message: ${subject}`,
      html: htmlContent,
    });

    await resend.emails.send({
      from: "Mark Tamang <mark@pakhreen.com>",
      to: email,
      subject: "Thank you for reaching out!",

      html: `
      <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;padding:40px;">

        <h2 style="color:#171717;">
          Kia Ora ${firstname},
        </h2>

        <p>
          Thank you for reaching out through my portfolio website.
        </p>

        <p>
          I have successfully received your message and will get back to you as soon as possible.
        </p>

        <p>
          I appreciate your time and look forward to speaking with you.
        </p>

        <br>

        <strong>
          Ngā mihi nui / Best regards,
        </strong>

        <br><br>

        <strong>
          Mark Tamang
        </strong>

        <br>

        Software Engineer

        <br><br>

        (+64) 22 380 3511

        <br>

        mark@pakhreen.com

        <br>

        https://marktmg.com

      </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
