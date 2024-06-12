import type { APIRoute } from "astro";
import { Resend } from "resend";
export const prerender = false;

interface ContactFormValues {
  topic: string;
  name: string;
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

  const { error } = await resend.emails.send({
    from: "Dawid Seipold <no-reply@dawidseipold.com>",
    to: [body.email],
    subject: `Dawid Seipold - ${normalizeTopic(body.topic)}`,
    html: `
      <h1>Hi, ${body.name}!</h1>
      <p>Thanks for contacting me! I'll get back to you as soon as possible.</p>
      <p>Greetings, <b>Dawid Seipold</b>!</p>
    `,
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response("Message sent successfully", { status: 200 });
};
