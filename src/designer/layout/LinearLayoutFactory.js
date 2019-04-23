import React from 'react';
import { FactoryRegister} from '../warpper';
import { sortable } from '../../lib/sortable';
import FormStudio from '../../util/FormStudio';
import { Layout } from '../component';
import LayoutWrapper from './LayoutWrapper';

/**
 * 这是一个特殊的布局
 */
@LayoutWrapper({focusAble: false, toolbarAble: false, layoutStyle:{
    display:'flex',
    position:'relative',
    width:'100%',
    minHeight:'50px',
  }})
class LinearLayout extends Layout{

  componentDidMount(){
    sortable(this.node, this);
  }

  ref=(node)=>{
    this.node = node;
  }

  renderChildren(){
    const {definition:{children}} = this.props;
    return children.map(item=>{
      return FormStudio.getFactory(item.type).renderComponenet(item)();
    });
  }

  render (){
    return (
      <div className="ui-sortable" ref={this.ref}>
        {this.renderChildren()}
      </div>
    )
  }
}

@FactoryRegister(LinearLayout)
class LinearLayoutFactory {
  type="LinearLayout"

  title="流式布局"

  /**
   * 初始化一个组件定义
   * @returns {{type: string, title: string}}
   */
  createComponentDefinition(){
    return  {
      type: this.type,
      title: this.title,
      props:{ },
      children:[]
    }
  }
}


export default LinearLayoutFactory;

