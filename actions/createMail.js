module.exports = {
  name: "createMail",
  action: function(modules) {
    return function(params) {
      let payload = {
        database: modules.database,
        params: {
          content: params.content,
          subject: params.subject,
          sender: params.sender,
          recipient: params.recipient,
          verify: params.verify
        }
      };
      return new Promise((resolve, reject) => {
        return createMail(payload)
        .then(resolve)
        .catch(reject);
      });
    }
  }
};

// =============================================

function createMail(payload) {
  // Replace \n by <br/>
  let regex = /\n/gi;
  let content = payload.params.content.replace(regex, '<br/>');
  // Save the mail
  return payload.database.Tables.Mails.create({
    content: content,
    subject: payload.params.subject,
    sender: payload.params.sender,
    recipient: payload.params.recipient,
    verify: payload.params.verify
  }).then(res => res.dataValues.id);
}
