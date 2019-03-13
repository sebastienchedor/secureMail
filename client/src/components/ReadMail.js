import React from 'react';
import {
  Form, Input, Button,
} from 'antd';

import MailArea from './MailArea.js'


class ReadMail extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    fetch(this.props.serverURL + 'mails?mailID=' + this.props.mailID + '&token=' + this.props.token)
    .then(res => {
      if (res.status === 200) {
        res.json().then(this.props.displayContent);
      } else if (res.status === 400) {
        alert('Bad parameters');
      } else if (res.status === 401) {
        alert('Unauthorized access');
      } else {
        throw new Error('Internal error');
      }
    })
    .catch(e => {
      alert(e.message);
    });
  }

  sendToken = () => {
    fetch(this.props.serverURL + 'tokens?mailID=' + this.props.mailID)
    .then(res => {
      if (res.status === 200) {
        alert('Token sent');
      } else if (res.status === 400) {
        alert('Bad parameters');
      } else if (res.status === 404) {
        alert('Unknown mail ID');
      } else {
        throw new Error('Internal error');
      }
    })
    .catch(e => {
      alert(e.message);
    });
  }

  render() {
    return (
      <Form
        onChange={this.props.handleChange}
        onSubmit={this.handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <Form.Item label='Mail ID'>
                  <Input name='mailID' value={this.props.mailID}/>
                </Form.Item>
              </td>
              <td>
                <Form.Item label='Token'>
                  <Input name='token' value={this.props.token}/>
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
        <Form.Item>
          <Button
            type='primary'
            onClick={this.sendToken}
          >
            Send token to verification address
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'>
            Display mail
          </Button>
        </Form.Item>
        <MailArea mail={this.props.mailContent}/>
      </Form>
    );
  }
}

export default ReadMail;
