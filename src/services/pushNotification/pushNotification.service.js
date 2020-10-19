const fireAdmin = require('firebase-admin');
const config = require('../../config/config');

const serviceAccount = JSON.parse(config.applicationCredential);

fireAdmin.initializeApp({
  credential: fireAdmin.credential.cert(serviceAccount),
});

const fcm = fireAdmin.messaging();

/**
 * @param {String} token - The token
 * @param {Map} payload - The payload
 * @argument payload ={   transactionType,  name}
 */

const sendToDevice = async (fcmToken, payload, ROLE) => {
  let fcmPayload;
  if (ROLE === 'user') {
    fcmPayload = {
      notification: {
        title: `${payload.title}`,
        body: ` ${payload.content}. `,
        icon: 'your-icon-url',
        click_action: 'FLUTTER_NOTIFICATION_CLICK',
      },
    };
  } else {
    fcmPayload = {
      notification: {
        title: `${payload.title}`,
        body: ` ${payload.content}. `,
        icon: 'your-icon-url',
        click_action: 'FLUTTER_NOTIFICATION_CLICK',
      },
    };
  }

  return await fcm.sendToDevice(fcmToken, fcmPayload);
};

module.exports = { sendToDevice };
