import React, {PureComponent} from 'react';
import {Button, Layout} from 'antd';
import {createRoot} from 'react-dom/client';
import FormDesigner from './designer/FormDesigner';
import FormStudio from "../../src/FormStudio";

require('@@/style/formView.less')
const {Header} = Layout;

class App extends PureComponent {
    getJsonData() {
        alert(JSON.stringify(FormStudio.getJsonData()));
    }

    override render() {
        return (
            <Layout className="layout">
                <Header style={{
                    background: 'white',
                    height: '60px',
                    lineHeight: '60px',
                    borderBottom: '1px solid #efefef'
                }}>
                    <Button type="primary" onClick={this.getJsonData} size="middle">获取数据</Button>
                </Header>
                <div style={{height: 'calc(100vh - 60px)'}}>
                    <FormDesigner/>
                </div>
            </Layout>
        );
    }
}

const domNode = createRoot(document.getElementsByTagName('body')[0])
domNode.render(<App/>)
