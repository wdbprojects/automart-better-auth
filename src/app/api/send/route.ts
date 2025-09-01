import { Resend } from "resend";
import { env } from "@/env";
import { EmailTemplate } from "@/components/shared/email-template";

const resend = new Resend(env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "AutomartBA <onboarding@resend.dev>",
      to: ["ronyortiop@gmail.com"],
      subject: "Hello there",
      react: EmailTemplate({ firstName: "Nata Slut" }),
    });
    if (error) {
      return Response.json({ error: error }, { status: 500 });
    }
    return Response.json(data);
  } catch (err) {
    return Response.json({ error: err }, { status: 500 });
  }
}
