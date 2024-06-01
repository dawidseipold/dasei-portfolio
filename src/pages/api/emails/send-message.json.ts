import { Resend } from "resend";

interface ContactFormValues {
  topic: string;
  name: string;
  email: string;
  message: string;
}

export async function POST({ params }: { params: ContactFormValues }) {
  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: "Dawid Seipold <no-reply@dawidseipold.dev>",
    to: [params.email],
    subject: `Dawid Seipold - ${params.topic}`,
    html: `
      <h1>Hi ${params.name},</h1>
      Thanks for contacting me! I'll get back to you as soon as possible.

      Greetings, Dawid Seipold!
    `,
  });

  if (error) {
    return { status: 500, body: { error } };
  }

  return { status: 200, body: { data } };
}
