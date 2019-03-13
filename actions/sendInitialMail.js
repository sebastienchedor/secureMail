const sendmail = require('sendmail')({silent: true});
const config = require('../config/config_server.js');

module.exports = {
  name: "sendInitialMail",
  action: function(modules) {
    return function(params) {
      let payload = {
        database: modules.database,
        params: {
          mailID: params.mailID
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
    payload.mailID = res.dataValues.id;
    payload.recipient = res.dataValues.recipient;
    payload.verify = res.dataValues.verify;
    return payload;
  });
}

const MESSAGEDEBUT = "Bonjour, vous avez reçu un message via SecureMail.<br/>Pour le consulter, rendez-vous sur le site " + config.host + config.port + " puis selectionnez le mail avec l'id ";
const MESSAGEMILIEU = "<br/>Vous pourrez ensuite demander un token qui vous sera envoyé à l'adresse : ";
const MESSAGEFIN = "<br/>Avec ces deux éléments (id et token), vous pourrez ensuite acceder au contenu du mail.";

function sendMail(payload) {
  let message = MESSAGEDEBUT + payload.mailID + MESSAGEMILIEU + payload.verify + MESSAGEFIN;
  sendmail({
      from: 'no-reply@securemail.com',
      to: payload.recipient,
      subject: "Réception d'un mail via SecureMail",
      html: message,
    }, function(err, reply) {
      if (err !== null) throw new Error('Error sending mail');
  });
}
