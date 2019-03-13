import React from 'react';
import { Card } from 'antd';

class MailArea extends React.Component {
  render() {
    console.log(this.props.mail);
    if (this.props.mail === null) return(
      <div></div>
    );
    let subject = 'Subject : ' + this.props.mail.subject;
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                Sent by :
              </td>
              <td>
                {this.props.mail.sender}
              </td>
            </tr>
            <tr>
              <td>
                To :
              </td>
              <td>
                {this.props.mail.recipient}
              </td>
            </tr>
          </tbody>
        </table>
        <Card
          title={subject}
        >
          <p dangerouslySetInnerHTML={{__html: this.props.mail.content}}>
          </p>
        </Card>
      </div>
    );
  }
}

export default MailArea;
