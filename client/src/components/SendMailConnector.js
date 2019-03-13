import { connect } from 'react-redux'
import SendMail from './SendMail.js'

const mapStateToProps = state => {
  return {
    sender: state.sendMail.sender,
    recipient: state.sendMail.recipient,
    verifyTo: state.sendMail.verifyTo,
    content: state.sendMail.content,
    subject: state.sendMail.subject,
    serverURL: state.serverURL
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleChange: e => {
      dispatch({
        type: 'UPDATE_SEND_MAIL',
        fieldName: e.target.name,
        value: e.target.value
      });
    },
    resetSendMail: () => {
      dispatch({
        type: 'RESET_SEND_MAIL'
      });
    }
  }
}

const VisibleSendMail = connect(
  mapStateToProps,
  mapDispatchToProps
)(SendMail)

export default VisibleSendMail
