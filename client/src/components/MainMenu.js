import React from 'react';
import { Layout, Menu, Icon } from 'antd';

import ReadMailConnector from './ReadMailConnector.js'
import SendMailConnector from './SendMailConnector.js'

const {
  Header, Content
} = Layout;


class MainMenu extends React.Component {
  state = {
    current: 'readMail',
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  selectContent = () => {
    if (this.state.current === 'readMail') return (<ReadMailConnector/>);
    if (this.state.current === 'sendMail') return (<SendMailConnector/>);
    return (<div>Error, this should not occur.</div>);
  };

  render() {
    return (
      <Layout className="layout">
        <Header style={{
          overflow: 'auto', position: 'fixed', width: '100%', zIndex: 1
        }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[this.state.current]}
            onClick={this.handleClick}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="readMail">
              <Icon type="read" />
              <span className="nav-text">Read Mail</span>
            </Menu.Item>
            <Menu.Item key="sendMail">
              <Icon type="mail" />
              <span className="nav-text">Send Mail</span>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ margin: '64px 16px 0', overflow: 'initial' }}>
          { this.selectContent() }
        </Content>
      </Layout>
    );
  }
}

export default MainMenu;
