import { NextResponse } from "next/server";
import { Resend } from "resend";

const recipientEmail = process.env.CONTACT_TO_EMAIL ?? "melvinvenk707@gmail.com";
const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ message: "Please complete all fields before sending." }, { status: 400 });
    }

    const resend = getResendClient();

    if (!resend) {
      return NextResponse.json({ message: "Email delivery is not configured yet." }, { status: 500 });
    }

    const subject = `New portfolio contact from ${body.name}`;
    const text = `Name: ${body.name}\nEmail: ${body.email}\n\nMessage:\n${body.message}`;

    await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      replyTo: body.email,
      subject,
      text,
    });

    return NextResponse.json({ message: "Thanks for reaching out. I’ll reply shortly." }, { status: 200 });
  } catch (error) {
    console.error("Contact form send failed", error);
    return NextResponse.json({ message: "Unable to send the message right now." }, { status: 500 });
  }
}
