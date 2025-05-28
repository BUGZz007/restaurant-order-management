const express = require('express');
const router = express.Router();
const twilio = require('twilio');

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

router.post('/send-sms', async (req, res) => {
    try {
        const { to, message } = req.body;
        const formattedPhone = to.replace(/\s+/g, '');
        const phoneToUse = formattedPhone.startsWith('+') ? formattedPhone : `+${formattedPhone}`;

        const response = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneToUse
        });

        console.log('SMS sent:', response.sid);
        res.json({ success: true, sid: response.sid });
    } catch (error) {
        console.error('Twilio Error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;