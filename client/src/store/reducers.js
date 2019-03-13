import {
  RESET_SEND_MAIL,
  UPDATE_READ_MAIL,
  UPDATE_SEND_MAIL
} from './actions.js'

const initialState = {
  sendMail: {
    sender: '',
    subject: '',
    recipient: '',
    verifyTo: '',
    content: ''
  },
  readMail: {
    mailID: '',
    token: '',
    mailContent: null
  },
  network: {
    initialMails: [],
    verificationMails: []
  },
  serverURL: require('../config/config_server.js').address
}

function secureMailApp(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {
    case RESET_SEND_MAIL:
      return Object.assign({}, state, {
        sendMail: {
          sender: '',
          subject: '',
          recipient: '',
          verifyTo: '',
          content: ''
        }
      });
    case UPDATE_SEND_MAIL:
      let sendMail = state.sendMail;
      sendMail[action.fieldName] = action.value;
      return Object.assign({}, state, {
        sendMail: sendMail
      });
    case UPDATE_READ_MAIL:
      let readMail = state.readMail;
      readMail[action.fieldName] = action.value;
      return Object.assign({}, state, {
        readMail: readMail
      });
    default:
      return state
  }
}

export default secureMailApp
