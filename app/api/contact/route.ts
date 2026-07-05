import { NextResponse } from "next/server";

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

    // TODO: Replace this stub with a real Resend integration.
    // Set the API key in your environment as RESEND_API_KEY and use the Resend SDK here.
    // Example:
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "Portfolio Contact <onboarding@resend.dev>",
    //   to: ["you@example.com"],
    //   subject: `New contact from ${body.name}`,
    //   text: body.message,
    // });

    return NextResponse.json({ message: "Thanks for reaching out. I’ll reply shortly." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Unable to send the message right now." }, { status: 500 });
  }
}
