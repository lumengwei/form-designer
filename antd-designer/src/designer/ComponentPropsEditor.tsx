import React, {PureComponent} from 'react'
import {FactoryRenders, FormHelper} from "./helper";
import {ReactComponentGroupState} from "./types";
import {ComponentDefinition} from "../../../src/types";

require('../../../src/style/formView.less');

/**
 * 属性编辑器
 */
class ComponentPropsEditor extends PureComponent<{}, ReactComponentGroupState<any>> {
    constructor(props: {}, context: any) {
        super(props, context);
        this.state = {
            definition: null,
            renderCounter: 0
        }
    }

    override componentDidMount() {
        FormHelper.formEditorIns = this;
    }


    setDefinition(definition: ComponentDefinition<any> | null) {
        this.setState({
            definition
        })
    }

    onValuesChange(props: any, values: any, _: any) {
        /* setTimeout(() => {// validateFields 的调用放在最后
             props.form.validateFields((err, allValues) => {
                 if (err) return;

                 const next = this.componentEditor.onChange(values, allValues);

                 if (this.componentIns && next !== false) {
                     this.componentIns.forceRender();
                 }
             })
         })*/
    }


    renderProps() {
        const {definition} = this.state;
        if (definition) {
            return FactoryRenders.getRender(definition.type).renderEditor(definition)({
                onValuesChange: this.onValuesChange.bind(this),
            });
        }
    }

    override render() {
        return (
            <div>
                {this.renderProps()}
            </div>
        );
    }
}

export default ComponentPropsEditor;
