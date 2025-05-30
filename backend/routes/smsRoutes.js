const express = require('express');
const router = express.Router();
const twilio = require('twilio');

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

router.post('/api/send-sms', async (req, res) => {
    try {
        const { to, message } = req.body;
        
        const response = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to
        });

        res.json({ success: true, messageId: response.sid });
    } catch (error) {
        console.error('Twilio Error:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

module.exports = router;