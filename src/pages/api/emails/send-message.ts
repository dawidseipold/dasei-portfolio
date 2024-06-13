import type { APIRoute } from "astro";
import { Resend } from "resend";
export const prerender = false;

interface ContactFormValues {
  topic: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const normalizeTopic = (topic: string) => {
  const words = topic.split("-");
  return words.map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
};

export const POST: APIRoute = async ({ request }: { request: Request }) => {
  // TEMPORARY SOLUTION UNTIL ASTRO FIXES DATA PARSING
  let body = JSON.parse(
    Object.fromEntries(new URL(request.url).searchParams).data
  ) as ContactFormValues;

  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  const { error: receiverError } = await resend.emails.send({
    reply_to: body.email,
    from: `${body.email} <${body.topic}@dawidseipold.com>`,
    to: ["contact@dawidseipold.com"],
    subject: `Dawid Seipold - ${normalizeTopic(body.topic)}`,
    html: `
      <h1>${normalizeTopic(body.topic)}</h1>
      <p>Name: ${body.firstName} ${body.lastName}</p>
      <p>Email: ${body.email}</p>
      <p>Message: ${body.message}</p>
    `,
  });

  if (receiverError) {
    return new Response(receiverError.message, { status: 500 });
  }

  const { error: senderError } = await resend.emails.send({
    from: "Dawid Seipold <no-reply@dawidseipold.com>",
    to: [body.email],
    subject: `Dawid Seipold - Contact`,
    html: `
      <h1>Hi, ${body.firstName} ${body.lastName}!</h1>
      <p>Thanks for contacting me! I'll get back to you as soon as possible.</p>
      <p>Greetings, <b>Dawid Seipold</b>!</p>

      <p>This message was automatically generated. Please do not reply to this email.</p>
    `,
  });

  if (senderError) {
    return new Response(senderError.message, { status: 500 });
  }

  const { error } = await resend.contacts.create({
    email: body.email,
    firstName: body.firstName,
    lastName: body.lastName,
    unsubscribed: false,
    audienceId: import.meta.env.RESEND_AUDIENCE_ID,
  });

  if (error) {
    console.error(error?.message);
  }

  return new Response("Message sent successfully", { status: 200 });
};
