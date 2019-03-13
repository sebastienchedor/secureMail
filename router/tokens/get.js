const actions = require("../../actions");

module.exports = (req, res) => {
  let params = { mailID: Number.parseInt(req.query.mailID) };
  let errors = invalidParameters(params);
  if (errors.length !== 0) return res.status(400).send({message: errors[0]});

  actions.createOrReplaceToken(params)
  .then(token => {
    return actions.sendVerificationMail({
      mailID: params.mailID,
      token: token
    });
  }).then(() => {
    return res.status(200).end();
  }).catch(e => {
    if (e.message === 'Unknown mail ID') return res.status(404).send("Unknown mail ID");
    return res.status(500).end();
  });
}

// ====================================

function invalidParameters(params) {
  if (!params.mailID || typeof params.mailID !== 'number') return ['Invalid mailID parameter'];
  return [];
}
