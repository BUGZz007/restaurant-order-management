const formatPhoneNumber = (phone) => {
    const cleanNumber = phone.replace(/\s+/g, '');
    return cleanNumber.startsWith('+') ? cleanNumber : `+${cleanNumber}`;
};

// Changed from sendSMSNotification to sendBookingNotification to match imports
export const sendBookingNotification = async (booking, status) => {
    try {
        const message = status === 'confirmed' 
            ? `🍽️ Vedeshi Khana\nHello ${booking.name}, your table reservation is confirmed for ${booking.when} 🕒.\nWe're excited to host you!`
            : `🍽️ Vedeshi Khana\nHello ${booking.name}, your table reservation has been cancelled ❌.\nHope to see you soon another time!`;

        const response = await fetch('http://localhost:8000/api/send-sms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: formatPhoneNumber(booking.phone),
                message: message
            })
        });

        return await response.json();
    } catch (error) {
        console.error('SMS Notification Error:', error);
        throw error;
    }
};