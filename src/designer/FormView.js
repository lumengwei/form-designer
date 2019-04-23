import React, {PureComponent} from 'react'
import FormStudio from '../util/FormStudio';

require('./formView.less');

class FormView extends PureComponent{

  LinearLayout = null;

  componentWillMount(){
     const LinearLayoutFactory =FormStudio.getFactory("LinearLayout");
    this.LinearLayout = LinearLayoutFactory.renderComponenet(LinearLayoutFactory.createComponentDefinition())({});
    FormStudio.topLayout = this.LinearLayout;
  }

  render() {
    const { formDefinition } = this.props;

    return (
      <div style={{width: formDefinition.width || '778px'}}>
        <div className="scroll-wrapper">
          <div className="form-view">
            <div className="form-head">
              <p className="form-name" />
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

export default FormView;
