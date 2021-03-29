import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const recipientPhoneOne = process.env.RECIPIENT_PHONE_1;
const recipientPhoneTwo = process.env.RECIPIENT_PHONE_2;
const senderPhone = process.env.SENDER_PHONE;

const client = twilio(accountSid, authToken);

export const sendMessage = async (message) => {
  try {
    const createMessage = (recipientPhone) => client.messages.create({
        body: `There are 1+ open appointments for a vaccine: ${message}`,
        from: senderPhone,
        to: recipientPhone
    });

    await Promise.all([
      createMessage(recipientPhoneOne),
      createMessage(recipientPhoneTwo)
    ]);
  } catch (error) {
    console.log(`error`, error)
  }
};
