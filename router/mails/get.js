const actions = require("../../actions");

module.exports = (req, res) => {
  let params = {
    token: req.query.token,
    mailID: Number.parseInt(req.query.mailID)
  };
  let errors = invalidParameters(params);
  if (errors.length !== 0) return res.status(400).send({message: errors[0]});

  actions.getMailWithTokenAndID(params).then(content => {
    return res.status(200).send({
      mail: content
    });
  }).catch(e => {
    if (e.message === 'Unauthorized access') return res.status(401).send("Unauthorized access");
    return res.status(500).end();
  });
}

// ====================================

function invalidParameters(params) {
  if (!params.token || typeof params.token !== 'string') return ['Invalid token parameter'];
  if (!params.mailID || typeof params.mailID !== 'number') return ['Invalid mailID parameter'];
  return [];
}
