import React, {PureComponent} from 'react';
import {Button, Layout} from 'antd';
import {createRoot} from 'react-dom/client';
import FormDesigner from './designer/FormDesigner';
import FormStudio from "../../src/FormStudio";

require('./designer/formView.less')
const {Header, Content} = Layout;

class App extends PureComponent {
    getJsonData() {
        alert(JSON.stringify(FormStudio.getJsonData()));
    }

    render() {
        return (
            <Layout className="layout">
                <Header style={{background: 'white'}}>
                    <div className="logo"/>
                    <Button type="primary" onClick={this.getJsonData}>获取数据</Button>
                </Header>
                <Content style={{padding: '50px 50px'}}>
                    <FormDesigner/>
                </Content>
            </Layout>
        );
    }
}

console.log(document)
const domNode = createRoot(document.getElementsByTagName('body')[0])
domNode.render(<App/>)
