const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();

const sendMail = async (email, subject, body) => {
    const config = {
        host: 'smtppro.zoho.in',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }

    const transporter = nodemailer.createTransport(config);

    const MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "MYS Shaadi",
            logo: 'https://www.mys-shaadi.com/static/media/logo.362707f2dd36dd5ac0be.png',
            link: 'https://mys-shaadi.com'
        }
    })

    const response = { body }

    const mail = MailGenerator.generate(response)

    const message = {
        from: process.env.EMAIL,
        to: email,
        subject,
        html: mail,
    }

    return await transporter.sendMail(message)
}

module.exports = sendMail