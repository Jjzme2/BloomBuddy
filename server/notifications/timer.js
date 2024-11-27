import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const setTimer = (duration, callback) => {
  setTimeout(callback, duration);
};

const sendNotification = (to, subject, text) => {
  const msg = {
    to,
    from: 'your-email@example.com',
    subject,
    text,
  };

  sgMail.send(msg)
    .then(() => {
      console.log('Notification sent successfully');
    })
    .catch((error) => {
      console.error('Error sending notification:', error);
    });
};

export { setTimer, sendNotification };
