import React, {PureComponent, ReactElement} from 'react'
import {FormDefinition} from "../../../src/types";
import FormStudio from "../../../src/FormStudio";
import {FactoryRenders} from "./helper";

require('./formView.less');

export default class FormView extends PureComponent<{ formDefinition: FormDefinition }> {

    private LinearLayout: ReactElement | null = null;

    componentWillMount() {
        const componentRender = FactoryRenders.getRender("LinearLayout");
        this.LinearLayout = componentRender.renderComponent(FormStudio.definition!)({
            focusAble: false,
            toolbarAble: false
        });
    }

    render() {
        const {formDefinition} = this.props;

        return (
            <div style={{width: formDefinition.width || '778px'}}>
                <div className="scroll-wrapper">
                    <div className="form-view">
                        <div className="form-head">
                            <p className="form-name"/>
                            <div className="form-description">{formDefinition.description}</div>
                        </div>
                        <div
                            className="form-content"
                        >
                            {this.LinearLayout}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

