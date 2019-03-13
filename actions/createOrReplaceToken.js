module.exports = {
  name: "createOrReplaceToken",
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
        .then(getToken)
        .then(insertOrUpdateToken)
        .then(payload => {resolve(payload.token);})
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
    if (!res) throw new Error('Unknown mail ID');
    payload.mailID = res.dataValues.id;
    return payload;
  });
}

function getToken(payload) {
  return payload.database.Tables.Tokens.findOne({
    where: {
      mailID: payload.mailID
    }
  }).then(res => {
    if (!res) {
      payload.todo = 'insert';
    } else {
      payload.todo = 'update';
      payload.entry = res;
    }
    return payload;
  });
}

function insertOrUpdateToken(payload) {
  let token = newToken(20);
  let expire = Date.now();
  // Insert ...
  if (payload.todo === 'insert') {
    return payload.database.Tables.Tokens.create({
      token: token,
      mailID: payload.mailID,
      expire: expire
    }).then(res => {
      if (!res) throw new Error('Error during insertion');
      payload.token = res.dataValues.token;
      return payload;
    });
  }
  // Or update
  if (payload.todo === 'update') {
    return payload.entry.update({
      token: token,
      expire: expire
    }).then(res => {
      if (!res) throw new Error('Error during update');
      payload.token = res.dataValues.token;
      return payload;
    });
  }
}

function newToken(length){
    let caracs = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    let res = [];
    for (let i=0; i<length; i++) {
        let j = Math.floor((Math.random() * (caracs.length-1)));
        res.push(caracs[j]);
    }
    return res.join("");
}
