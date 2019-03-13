const sendmail = require('sendmail')({silent: true});

module.exports = {
  name: "sendVerificationMail",
  action: function(modules) {
    return function(params) {
      let payload = {
        database: modules.database,
        params: {
          mailID: params.mailID,
          token: params.token
        }
      };
      return new Promise((resolve, reject) => {
        return getMail(payload)
        .then(sendMail)
        .then(resolve)
        .catch(reject);
      });
    }
  }
};

// =============================================

function getMail(payload) {
  return payload.database.Tables.Mails.findOne({
    where: {
      id: payload.params.mailID
    }
  }).then(res => {
    if (!res) throw new Error('Unknown mail');
    payload.verify = res.dataValues.verify;
    return payload;
  });
}

const MESSAGEDEBUT = "Le service SecureMail vient de vous envoyer un token, le voici : ";

function sendMail(payload) {
  let message = MESSAGEDEBUT + payload.params.token;
  sendmail({
      from: 'no-reply@securemail.com',
      to: payload.verify,
      subject: "Token de vérification d'un mail via SecureMail",
      html: message,
    }, function(err, reply) {
      if (err !== null) throw new Error('Error sending mail');
  });
}
