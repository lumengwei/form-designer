import {PureComponent} from 'react';
import FormStudio from '../util/FormStudio';

export class Component extends PureComponent{
  componentWillMount(){
    const { definition :{type, title}} = this.props;
    if(!type || !title){
      throw new Error(`type:${type}, title:${title} not defined in definition`);
    }
  }

  /* shouldComponentUpdate(nextProps, nextState, nextContext){
    const {definition}  = this.props;
    const {definition: nextDefinition} = this.props;
    return !deepEal(definition, nextDefinition) || super.shouldComponentUpdate(nextProps, nextState, nextContext);
  } */

  /**
   * shouldComponentUpdate 默认不是对象的深层比较，采用标志位的方式
   * 此方法代替foreUpdate
   */
  forceRender(){
    const {renderCounter} = this.state;
    this.setState({
      renderCounter:(renderCounter || 0)+1
    })
  }
}

export class ComponentGroup extends Component{

  componentWillMount(){
    super.componentWillMount();
    const { definition :{children}} = this.props;
    if(!children || !Array.isArray(children)){
      throw new Error(`children:${children} not defined in definition`);
    }
  }

  /**
   * 添加子组件
   * @param index
   * @param componentDefinition
   */
  addChild(index, componentDefinition){
    const {definition:{children}, definition} = this.props;
    children.splice(index,0, componentDefinition)
    this.setState({
      definition:{
        ...definition,
      }
    })
  }

  /**
   * 移除子组件
   * @param index
   */
  removeChild(index){
    console.log(`index:${index}`)
    const {definition:{children}, definition} = this.props;
    children.splice(index,1)
    this.setState({
      definition:{
        ...definition,
      }
    })
  }
}

export class Layout extends ComponentGroup{

  onActive=()=>{
    if(FormStudio.activeComponent){
      FormStudio.activeComponent.unActive();
    }

    FormStudio.activeComponent = this;

    this.setState({
      active: true
    })
  }

  unActive=()=>{
    this.setState({
      active: false
    })
  }
}
