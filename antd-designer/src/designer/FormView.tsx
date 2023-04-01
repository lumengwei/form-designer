import React, {PureComponent, ReactElement} from 'react'
import {FormDefinition} from "../../../src/types";
import FormStudio from "../../../src/FormStudio";
import {FactoryRenders, FormHelper} from "./helper";
import {ReactComponentState} from "./types";

require('../../../src/style/formView.less');

type FormViewProps = {
    formDefinition: FormDefinition
}
export default class FormView extends PureComponent<FormViewProps, ReactComponentState> {

    private LinearLayout: ReactElement | null = null;


    constructor(props: FormViewProps, context: any) {
        super(props, context);
        this.state = {
            renderCounter: 0
        }
    }

    /**
     * shouldComponentUpdate 默认不是对象的深层比较，采用标志位的方式
     * 此方法代替foreUpdate
     */
    forceRender() {
        const {renderCounter} = this.state;
        this.setState({
            renderCounter: (renderCounter || 0) + 1
        });
    }

    componentWillMount() {
        const componentRender = FactoryRenders.getRender("LinearLayout");
        this.LinearLayout = componentRender.renderComponent(FormStudio.definition!)({
            focusAble: false,
            toolbarAble: false
        });

        FormHelper.formView = this;
    }

    render() {
        const {formDefinition} = this.props;

        return (
            <div className="form-view" style={{width: formDefinition.width || '778px'}}>
                <div className="form-head">
                    <div className="form-name">{formDefinition.title}</div>
                    <div className="form-description">{formDefinition.description}</div>
                </div>
                <div
                    className="form-content"
                >
                    {this.LinearLayout}
                </div>
            </div>
        );
    }
}

