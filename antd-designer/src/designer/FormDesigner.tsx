import React, {PureComponent, useRef, useEffect} from 'react'
import {Tabs} from 'antd';
import FormView from './FormView';
import componentStyle from '@@/style/component.module.less';
import ComponentPropsEditor from './ComponentPropsEditor';
import FormStudio from "@@/FormStudio";
import {Component, ComponentFactory, FactoryGroup} from "@@/types";
import {draggable} from "@/designer/lib/sortable";
import FormPropsEditor from "./FormPropsEditor";

require('./components');

require('./layout');

function FormComponentList(props: {
    widgetList: ComponentFactory<any>[]
}) {
    const domRef = useRef(null);
    useEffect(() => {
        draggable(domRef.current, props.widgetList);
    }, [])
    return (<>
        <div className={componentStyle.widgetList} ref={domRef}>
            {props.widgetList.map(it => {
                return <div
                    draggable
                    className={componentStyle.widgetItem}
                >
                    {it.title}
                </div>
            })}
        </div>
    </>);
}

class FormDesigner extends PureComponent {

    override render() {
        return (
            <div className="form-designer">
                <div className="form-widget">
                    <Tabs>
                        <Tabs.TabPane tab="表单组件" key='1'>
                            <FormComponentList
                                widgetList={FormStudio.factoryList.filter(it => it.group == FactoryGroup.Component)}/>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="布局" key='2'>
                            <FormComponentList
                                widgetList={FormStudio.factoryList.filter(it => it.group == FactoryGroup.Layout)}/>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
                <div className="form-view-wrapper">
                    <FormView formDefinition={FormStudio.formDef}/>
                </div>

                <div className="form-editor">
                    <Tabs>
                        <Tabs.TabPane tab="控件属性" key='1'>
                            <ComponentPropsEditor/>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="表单属性" key='2'>
                            <FormPropsEditor definition={FormStudio.formDef}/>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default FormDesigner;
