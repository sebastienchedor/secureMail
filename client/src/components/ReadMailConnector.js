import { connect } from 'react-redux'
import ReadMail from './ReadMail.js'

const mapStateToProps = state => {
  return {
    mailID: state.readMail.mailID,
    token: state.readMail.token,
    mailContent: state.readMail.mailContent,
    serverURL: state.serverURL
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleChange: e => {
      dispatch({
        type: 'UPDATE_READ_MAIL',
        fieldName: e.target.name,
        value: e.target.value
      });
    },
    displayContent: response => {
      console.log(response);
      dispatch({
        type: 'UPDATE_READ_MAIL',
        fieldName: 'mailContent',
        value: response.mail
      });
    }
  }
}

const VisibleReadMail = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReadMail)

export default VisibleReadMail
