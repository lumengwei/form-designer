import React, { PureComponent } from 'react';
import { Form } from 'antd';
import FormStudio from '../util/FormStudio';
import FormViewContext from './FormViewContext';
import './formView.less';

class FormView extends PureComponent {
  LinearLayout = null;

  componentWillMount() {
    const {
      formDefinition: { scheme },
    } = this.props;
    const LinearLayoutFactory = FormStudio.getFactory('LinearLayout');
    const definition = scheme || LinearLayoutFactory.createComponentDefinition();
    this.LinearLayout = LinearLayoutFactory.renderComponenet(definition)({
      ref: node => {
        if (node && this.props.edit) {
          FormStudio.topLayout = node;
        }
      },
    });
  }

  render() {
    const { formDefinition, form } = this.props;
    return (
      <div style={{ width: formDefinition.width || false, height: '100%' }}>
        <div className="scroll-wrapper" style={{ height: '100%' }}>
          <div className="form-view" style={{ height: '100%' }}>
            <div className="form-head">
              <p className="form-name" />
              <div className="form-description">{formDefinition.description}</div>
            </div>
            <FormViewContext.Provider value={{ edit: this.props.edit, form }}>
              <Form style={{ height: '88%' }}>
                <div className="form-content">{this.LinearLayout}</div>
              </Form>
            </FormViewContext.Provider>
          </div>
        </div>
      </div>
    );
  }
}


export default FormView
