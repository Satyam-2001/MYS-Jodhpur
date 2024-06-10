const sendMail = require('./mail')

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

const sendVerificationEmail = async (req, res) => {
    try {
        const user = req.body;
        otpArray = otpArray.filter((currentUser) => {
            return isOtpValid(currentUser.expire_time) && !isSameUser(currentUser, user);
        })

        const { email, name } = user
        const subject = 'Verify Email'
        const otp = otpGenerator()

        const body = {
            name: name,
            intro: "It looks like you are trying to register to MYS Johpur using your email and password. As an additional security measure you are requested to enter the OTP code (one-time password) provided in this email.\nIf you did not intend to register to MYS Jodhpur, please ignore this email.",
            outro: `The OTP code is: <b>${otp}</b>`
        }

        sendMail(email, subject, body)

        const expire_time = getTime()
        const otpField = {
            email,
            otp,
            expire_time,
        }
        otpArray.push(otpField)
        return res.status(201).json({ msg: 'OTP has been sent on your email', expire_time })
    }
    catch (e) {
        return res.status(500).json({ e })
    }
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

module.exports = { sendVerificationEmail, verifyEmail }