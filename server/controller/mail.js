const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();

const sendMail = async (email, subject, body) => {
    const config = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }

    const transporter = nodemailer.createTransport(config);

    const MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "MYS Jodhpur",
            logo: 'https://github.com/Satyam-2001/Bytes-Bridge/assets/88069082/586d8b68-420e-484a-b50a-9cabbcdfaa92',
            link: 'https://mysjodhpur.in'
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