import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '465',
    secure: true,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASS
    }

})

export const sendEmail = async(to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            text,
            html,
        })
        return {success: true, messageId: info.messageId}
    } catch (error) {
        console.error('Error sending email:', error)
        return {success: false, error: error.message}
    }
} 