import React, {PureComponent} from 'react'
import FormStudio from '../util/FormStudio';

require('./formView.less');

/**
 * 属性编辑器
 */
class FormEditor extends PureComponent{

  state={
    definition:null
  }

  componentIns = null;

  componentEditor = null;

  componentDidMount(){
    FormStudio.propsEditor = this;
  }

  componentEditorRef=(node)=>{
    this.componentEditor = node;
  }

  /**
   * 设置组件实例
   * @param componentIns
   */
  setComponentIns(componentIns){
    this.componentIns = componentIns;
    if(componentIns){
      this.setState({
        definition: componentIns.props.definition
      });
    }else{
      this.setState({
        definition: null
      });
    }
  }

  onValuesChange(props,values, _){
    setTimeout(()=>{// validateFields 的调用放在最后
      props.form.validateFields((err,allValues)=>{
        if (err) return;

        const next = this.componentEditor.onChange(values, allValues);

        if(this.componentIns && next !== false){
          this.componentIns.forceRender();
        }
      })
    })
  }

  refreshComponent(){
    if(this.componentIns){
      this.componentIns.forceRender();
    }
  }

  renderProps(){
    const {definition} = this.state;
    if(definition){
      return FormStudio.getFactory(definition.type).renderEditor(definition)({componentIns:this.componentIns, onValuesChange:this.onValuesChange.bind(this), wrappedComponentRef:this.componentEditorRef});
    }
  }

  render() {
    return (
      <div>
        {this.renderProps()}
      </div>
    );
  }
}

export default FormEditor;
