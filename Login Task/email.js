const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const msg = {
  to: 'pavithra04ec@egmail.com',
  from: 'pavithradevisubu@gmail.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);
console.log(msg)