const Promise = require("bluebird");

let database = null;
var DBinitialized = false;

let exported = {
  initialize: initialize
}

addNewAction('createMail.js');
addNewAction('createOrReplaceToken.js');
addNewAction('getMailWithTokenAndID.js');
addNewAction('sendInitialMail.js');
addNewAction('sendVerificationMail.js');
module.exports = exported

// ========================

function initialize(dbObject) {
  console.log("\033[1mSynchronisation avec la base de donnée.\033[0m");
  return Promise.try(() => {
    return dbObject.connect();
  }).then(() => {
    DBinitialized = true;
    database = dbObject;
    console.log("\033[1mSynchronisation avec la base de donnée terminée.\033[0m");
  }).catch((err) => {
    console.log("\033[1mEchec de la synchronisation avec la base de donnée.\033[0m\n" + err);
  })
}

function addNewAction(fileName) {
  let file = require("./" + fileName);
  let action = (params) => {
    if (!DBinitialized) throw("Base de donnée non synchronisée.");
    let modules = {
      database
    }
    return file.action(modules)(params);
  };
  exported[file.name] = action;
}
