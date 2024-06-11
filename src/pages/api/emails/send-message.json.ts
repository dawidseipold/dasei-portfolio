import { Resend } from "resend";

interface ContactFormValues {
  topic: string;
  name: string;
  email: string;
  message: string;
}

export async function POST({
  params,
  request,
}: {
  params: ContactFormValues;
  request: ContactFormValues;
}) {
  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: "Dawid Seipold <no-reply@dawidseipold.com>",
    to: [request.email],
    subject: `Dawid Seipold - ${request.topic}`,
    html: `
      <h1>Hi ${request.name},</h1>
      Thanks for contacting me! I'll get back to you as soon as possible.

      Greetings, <b>Dawid Seipold<b>!
    `,
  });

  if (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
