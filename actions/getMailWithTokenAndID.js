const DELAY = require('../config/config_constant.js').delay_expire;

module.exports = {
  name: "getMailWithTokenAndID",
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
        return getToken(payload)
        .then(getMail)
        .then(payload => resolve(payload.mail))
        .catch(reject);
      });
    }
  }
};

// =============================================

function getToken(payload) {
  let limitDate = Date.now() - DELAY;
  return payload.database.Tables.Tokens.findOne({
    where: {
      mailID: payload.params.mailID,
      token: payload.params.token,
      expire: {
        $gt: limitDate
      }
    }
  }).then(res => {
    if (!res) throw new Error('Unauthorized access');
    payload.mailID = res.dataValues.mailID;
    return payload;
  });
}

function getMail(payload) {
  return payload.database.Tables.Mails.findOne({
    where: {
      id: payload.mailID
    }
  }).then(res => {
    if (!res) throw new Error('Unknown mail');
    payload.mail = {
      sender: res.dataValues.sender,
      recipient: res.dataValues.recipient,
      subject: res.dataValues.subject,
      content: res.dataValues.content,
    };
    return payload;
  });
}
