import type { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";
import { siteConfig } from "../../src/config/site";

interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message: string;
}

const handler: Handler = async (
  event: HandlerEvent,
  _context: HandlerContext,
) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Parse body
  let data: ContactFormData;
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON" }),
    };
  }

  // Validate required fields
  if (!data.name || !data.phone || !data.message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required fields" }),
    };
  }

  // Get environment variables
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const CONTACT_EMAIL =
    process.env.CONTACT_EMAIL || siteConfig.contact.email.primary;

  // If no API key, log and return success (for testing)
  if (!RESEND_API_KEY) {
    console.log("Contact form submission (no RESEND_API_KEY configured):");
    console.log(JSON.stringify(data, null, 2));
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Form received (email not sent - no API key)",
      }),
    };
  }

  // Build email content
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #FFC107; border-bottom: 2px solid #FFC107; padding-bottom: 10px;">
        Nowa wiadomość z formularza kontaktowego
      </h2>
      <p><strong>Imię:</strong> ${data.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      <p><strong>Telefon:</strong> ${data.phone}</p>
      <p><strong>Rodzaj usługi:</strong> ${data.service}</p>
      <p><strong>Wiadomość:</strong></p>
      <div style="background: #f5f5f5; padding: 15px; border-left: 3px solid #FFC107;">
        ${data.message.replace(/\n/g, "<br>")}
      </div>
      <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
      <p style="color: #666; font-size: 12px;">
        Wiadomość wysłana przez formularz na stronie haris-instal.pl
      </p>
    </div>
  `;

  const emailText = `
Nowa wiadomość z formularza kontaktowego

Imię i nazwisko: ${data.name}
Telefon: ${data.phone}
${data.email ? `Email: ${data.email}` : ""}
${data.service ? `Rodzaj usługi: ${data.service}` : ""}

Wiadomość:
${data.message}
  `.trim();

  // Send email via Resend
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `${siteConfig.name} <kontakt@haris-instal.pl>`,
        to: [CONTACT_EMAIL],
        subject: `Nowe zapytanie: ${data.service || "Kontakt"} - ${data.name}`,
        html: emailHtml,
        text: emailText,
        reply_to: data.email || undefined,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Resend API error:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to send email" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email" }),
    };
  }
};

export { handler };
