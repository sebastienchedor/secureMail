import React from 'react';
import {
  Form, Input, Button,
} from 'antd';


class SendMail extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    fetch(this.props.serverURL + 'mails', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        sender: this.props.sender,
        subject: this.props.subject,
        recipient: this.props.recipient,
        verify: this.props.verifyTo,
        content: this.props.content
      })
    })
    .then(res => {
      if (res.status === 200) {
        alert('Mail sent');
        this.props.resetSendMail();
      } else if (res.status === 400) {
        res.json().then(response => alert('Bad parameters : ' + response.message));
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
        onSubmit={this.handleSubmit}
      >
        <table>
          <tbody>
            <tr>
              <td colSpan='2'>
                <Form.Item label='From'>
                  <Input name='sender' value={this.props.sender}/>
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                <Form.Item label='Send to'>
                  <Input name='recipient' value={this.props.recipient}/>
                </Form.Item>
              </td>
              <td>
                <Form.Item label='Send verification to'>
                  <Input name='verifyTo' value={this.props.verifyTo}/>
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td colSpan='2'>
                <Form.Item label='Subject'>
                  <Input name='subject' value={this.props.subject}/>
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
        <Form.Item label='Content'>
          <Input.TextArea rows={18} name='content' value={this.props.content}/>
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
          >
            Send mail
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default SendMail;
