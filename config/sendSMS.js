// const OTP = require('../models/otpModel');
// const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

// module.exports = async function (number) {
//     const expiresIn = Date.now() + 3600000;
//     const code = Math.floor((Math.random() * 900000) + 100000);

//     const message = await client.messages.create({
//         from: '+998992263026',
//         to: `+${number}`,
//         body: `Freegram hisobingizga kirish uchun quyidagi tasdiqlash kodidan foydalaning: ${code}. Kodning amal qilish muddati 1 soat.`
//     });

//     await OTP.create({
//         phoneNumber: number,
//         code,
//         expiresIn,
//     });

//     console.log(message.sid);
// }


const OTP = require('../models/otpModel');
const { Vonage } = require('@vonage/server-sdk');
const dotenv = require('dotenv').config();

const vonage = new Vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET
});

module.exports = async function (number) {
    const expiresIn = Date.now() + 3600000;
    const code = Math.floor((Math.random() * 900000) + 100000);

    const from = "Vonage APIs";
    const to = `+${number}`;
    const text = `Use this code to log in: ${code}. Expires in 1 hour.`;

    try {
        const response = await vonage.sms.send({ to, from, text });
        console.log('Message sent successfully');
        console.log(response);

        await OTP.create({
            phoneNumber: number,
            code,
            expiresIn,
        });
    } catch (error) {
        console.error('There was an error sending the message:', error);
    }
}