const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();

let otpArray = []
const minutes = 5

const otpGenerator = () => {
    const otp = Math.floor((Math.random() * 9000) + 1000);
    return otp;
}

const getTime = () => {
    return (new Date((new Date()).getTime() + minutes * 60000)).getTime();
}

const isSameUser = (user1, user2) => {
    return user1.email == user2.email
}

const isOtpValid = (time) => {
    const currentTime = new Date();
    const expireTime = new Date(time);
    return currentTime.getTime() <= expireTime.getTime();
}

const sendEmail = async (req, res) => {

    const { email, first_name, last_name, password } = req.body;

    let config = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "MYS Jodhpur",
            logo: 'https://github.com/Satyam-2001/Bytes-Bridge/assets/88069082/586d8b68-420e-484a-b50a-9cabbcdfaa92',
            link: 'https://mysjodhpur.in'
        }
    })

    const otp = otpGenerator()

    let response = {
        body: {
            name: first_name,
            intro: "It looks like you are trying to register to MYS Johpur using your email and password. As an additional security measure you are requested to enter the OTP code (one-time password) provided in this email.\nIf you did not intend to register to MYS Jodhpur, please ignore this email.",
            outro: `The OTP code is: <b>${otp}</b>`
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from: process.env.EMAIL,
        to: email,
        subject: "Verify Email",
        html: mail
    }

    try {
        await transporter.sendMail(message)
        const expire_time = getTime()
        const otpField = {
            email,
            otp,
            expire_time,
        }
        otpArray.push({ ...otpField, otp })
        return res.status(201).json({ msg: 'OTP as been sent on your email', expire_time })
    }
    catch (e) {
        return res.status(500).json({ e })
    }
}

const resendEmail = (req, res) => {
    const user = req.body;
    otpArray = otpArray.filter((_user) => {
        return !isOtpValid(_user.expire_time) || isSameUser(_user, user);
    })
    sendEmail(req, res)
}

const verifyEmail = (req, res, next) => {
    try {
        const user = req.body;
        otpArray = otpArray.filter((_user) => {
            return isOtpValid(_user.expire_time)
        })
        const userData = otpArray.find((_user) => {
            return isSameUser(_user, user);
        })
        if (!userData) {
            res.status(404).send({
                msg: 'OTP have been expired',
            })
        }
        if (userData.otp != user.otp) {
            res.status(406).send({
                msg: 'OTP doesn\'t match'
            })
        }
        else {
            delete req.body.otp
            next()
        }
    }
    catch (e) {
        res.status(500).send()
    }
}

module.exports = { sendEmail, verifyEmail, resendEmail }