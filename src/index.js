/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-alert */
/* eslint-disable class-methods-use-this */
import React, { PureComponent } from 'react';
import { Layout, Button } from 'antd';
import { render } from 'react-dom';
import FormDesigner from './designer/FormDesigner';
import 'antd/dist/antd.css';
import FormStudio from './util/FormStudio'; // or 'antd/dist/antd.less'

const { Header, Content } = Layout;

class App extends PureComponent {
  getJsonData() {
    alert(JSON.stringify(FormStudio.getJsonData()));
  }

  render() {
    return (
      <Layout className="layout">
        <Header style={{ background: 'white' }}>
          {/* <div className="logo" /> */}
          <Button type="primary" onClick={this.getJsonData}>
            获取数据
          </Button>
        </Header>
        <Content style={{ padding: '10px 0px' }}>
          <FormDesigner />
        </Content>
      </Layout>
    );
  }
}

export default App;

render(<App />, document.getElementsByTagName('body')[0]);
