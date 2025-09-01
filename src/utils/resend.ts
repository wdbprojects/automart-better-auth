import { Resend } from "resend";
import { env } from "@/env";
import { EmailTemplate } from "@/components/shared/email-template";

export const resend = new Resend(env.RESEND_API_KEY);
