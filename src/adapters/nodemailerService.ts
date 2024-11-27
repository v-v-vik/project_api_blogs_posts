import nodemailer from "nodemailer";
import {SETTINGS} from "../settings";

export const nodemailerService = {
    async sendEmail(email: string, code: string, template: (code: string) => string) {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: SETTINGS.EMAIL,
                pass: SETTINGS.EMAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: SETTINGS.EMAIL,
            to: email,
            subject: "Registration Confirmation",
            html: template(code),
        });

        return !!info;
    }
}