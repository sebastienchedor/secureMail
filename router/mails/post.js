const actions = require("../../actions");
const validator = require("email-validator");

module.exports = (req, res) => {
  let params = {
    content: req.body.content,
    subject: req.body.subject,
    sender: req.body.sender,
    recipient: req.body.recipient,
    verify: req.body.verify
  };
  let errors = invalidParameters(params);
  if (errors.length !== 0) return res.status(400).send({message: errors[0]});

  actions.createMail(params)
  .then(id => {
    return actions.sendInitialMail({ mailID: id });
  }).then(() => {
    return res.status(200).end();
  }).catch(e => {
    return res.status(500).end();
  });
}

// ====================================

function invalidParameters(params) {
  if (!params.content || typeof params.content !== 'string') return ['Invalid content parameter'];
  if (!params.subject || typeof params.subject !== 'string') return ['Invalid subject parameter'];
  if (!params.sender || typeof params.sender !== 'string') return ['Invalid sender parameter'];
  if (!validator.validate(params.sender)) return ['Sender should be an email address'];
  if (!params.recipient || typeof params.recipient !== 'string') return ['Invalid recipient parameter'];
  if (!validator.validate(params.recipient)) return ['Recipient should be an email address'];
  if (!params.verify || typeof params.verify !== 'string') return ['Invalid verify parameter'];
  if (!validator.validate(params.verify)) return ['Verify should be an email address'];
  return [];
}
