
<h1 align="center">Form Designer</h1>

<div align="center">

基于<a href="https://ant.design/" target="_blank" rel="noopener noreferrer">Ant Design</a> 和 <a href="http://jqueryui.com/" target="_blank" rel="noopener noreferrer">jQuery UI</a> 的表单设计器

![](https://github.com/lumengwei/form-designer/blob/master/preview.png)

</div>


## 概念
- Comonent 组件
- Layout 布局，一种特殊的Component
- Component Editor 组件属性编辑器
- Component Factory 组件工厂，创建Component 和 Component Editor


## 扩展组件

### 创建一个组件

组件的定义是通过<b>this.props.definition</b>来传递的。definition的格式如下：
```
{
  type: 'Checkbox', // 必须存在
  title: '多选框',  // 必须存在
  props:{
    'columnNum':2
  },
  children:[// 只有在Layout 中出现该属性
    componentDefinition,
    ...
  ]
}
```

在this.props 中还提供了<b>renderCounter</b>属性，每次组件的刷新该属性值会自增。definition的结构可能是深层次的，然而在Ant Design提供的React 组件中的<a href="https://reactjs.org/docs/react-component.html#shouldcomponentupdate" target="_blank" rel="noopener noreferrer">shouldComponentUpdate(nextProps,nextState)</a>方法的实现是对象的浅层比较，在某些情况下Component Editor对组件属性的改变不会导致组件的刷新。可以通过renderCounter来解决组件不刷新的问题。
```
/**
 * 组件
 */
@ComponentWrapper
class CheckboxComponent extends Component{

  render(){
    const { definition :{props}, renderCounter} = this.props;
    const defaultValue = props.options.filter(item=>{
      return item.checked;
    }).map(item=>{
      return item.value;
    });

    return (
      <CheckboxGroup options={props.options} value={defaultValue} renderCounter={renderCounter} />
    )
  }
}

```
```

/**
 * 组件编辑器
 */
@ComponentEditor
class InputComponentEditor extends PureComponent{

   /**
    * 当编辑器改变时，此方法被调用
    */
  onChange(_, allValues){
    if(!isNull(allValues.minLength, allValues.maxLength) && allValues.minLength > allValues.maxLength){
      message.warn(`最小长度${allValues.minLength}应该小于最大长度${allValues.maxLength}`);
      return false;// 阻止组件的刷新
    }

    const { definition:{props}, definition } = this.props;
    definition.name = getErasure(allValues, 'name');
    definition.title = getErasure(allValues, 'title');
    Object.assign(props, allValues);
    props.minLength = guaranteeNumber(props.minLength, 0, Number.MAX_VALUE);
    props.maxLength = guaranteeNumber(props.maxLength, 0, Number.MAX_VALUE);

    return true;
  }

  render(){
   return (
     <PropsEditor {...this.props} lengthLimit placeholder/>
   );
  }
}

```

```
/**
 * 组件工厂
 */
@FactoryRegister(InputComponent,InputComponentEditor)
class InputFactory {
  type="Input"      // 必须存在

  title="单行输入框"    // 必须存在

  /**
   * 初始化一个组件定义
   * @returns {{type: string, title: string}}
   */
  createComponentDefinition(){
    return {
      type: this.type,
      title: this.title,
      props:{
        placeholder: '请输入'
      },
    }
  }
}

export default InputFactory;
```

在compoents/index.js 或 layout/index.js 引入自己组件
