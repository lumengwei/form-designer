const factoryStore = {};

const factoryList=[];

class FormStudio{
  draggedFactory= null;

     // 处于拖拽状态下的组件工厂
  propsEditor = null;       // 属性编辑器

  _activeComponent = null;  // 当前被激活的组件

  _topLayout= null; // 顶级布局

  /**
   * 注册组件工厂
   * @param factory
   */
  registerFactory(factory){
    if(factoryStore[factory.type]){
      console.log(`[warn] factory ${factory.type} is exist, ignore`);
      return;
    }

    factoryStore[factory.type] = factory;
    factoryList.push(factory);
  }

  /**
   * 根据类型获取工厂
   * @param factoryType
   * @returns {*}
   */
  getFactory(factoryType){
    return factoryStore[factoryType]
  }

  factoryMap(map){
    return factoryList.map(map);
  }

  factoryFilter(filter){
    return factoryList.filter(filter);
  }

  set activeComponent(component){
    this._activeComponent = component;
    if(component){
      this.propsEditor.setComponentIns(component)
    }else{
      this.propsEditor.setComponentIns(null)
    }
  }

  get activeComponent(){
    return this._activeComponent;
  }

  set topLayout(layout){
    this._topLayout = layout;
  }

  getJsonData(){
    return JSON.parse(JSON.stringify(this._topLayout.props.definition))
  }
}



export default new FormStudio();

