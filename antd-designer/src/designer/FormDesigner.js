import React, {PureComponent} from 'react'
import {Tabs, Card} from 'antd';
import $ from '../lib/jquery';
import FormView from './FormView';
import componentStyle from './component.less';
import FormStudio from '../util/FormStudio';
import PropsEditor from './PropsEditor';

require('./components');

require('./layout');

const TabPane = Tabs.TabPane;

class FormComponent extends PureComponent{
  ref= (node)=>{
    this.node = node;
  }

  componentDidMount(){
    const { component } = this.props;
    $(this.node).draggable({
      connectToSortable: ".ui-sortable",
      helper: "clone",
      opacity: .8,
      appendTo: "body",
      start() {
        FormStudio.draggedFactory = component;
      },
      stop(){
        FormStudio.draggedFactory = null;
      }
    }).disableSelection();
  }

  render(){
    const {component, onMouseDown, onMouseUp} = this.props;
    return (
      <div
        draggable
        className={componentStyle.widgetItem}
        onMouseDown={()=>onMouseDown(component.type)}
        onMouseUp={()=>onMouseUp(component.type)}
        ref={this.ref}
        key={component.type}
      >
        {component.title}
      </div>
    )
  }
}



class FormDesigner extends PureComponent {

  componentDidMount(){

  }

  onMouseDown = (componentType)=>{
    this.setState({dragVisible:true});
    console.log(componentType);
  }

  onMouseUp = (componentType)=>{
    // this.setState({dragVisible:false});
    console.log(componentType);
  }


  renderChild(){
    return FormStudio.factoryFilter(item=>item.type !== 'LinearLayout').map(item=>{
      return <FormComponent component={item} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} />
    })
  }

  render() {
    return (
      <div className="form-designer">
        <Card bordered  type="card">
            <div
                className={componentStyle.widgetList}
            >
                {this.renderChild()}
            </div>
        </Card>

        <div>
          <FormView formDefinition={{}} />
        </div>

        <Card bordered style={{flexGrow:1}} type="card" title="属性编辑">
          <PropsEditor />
        </Card>
      </div>
    );
  }
}

export default FormDesigner;
