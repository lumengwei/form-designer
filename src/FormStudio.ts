import {
  ComponentDefinition,
  ComponentFactory,
  ComponentType,
  FactoryGroup,
  FormDefinition,
} from './types';

class FormStudio {
  private _factoryList: ComponentFactory<any>[] = [];
  private _factoryStore: Map<ComponentType, ComponentFactory<any>> = new Map<
    ComponentType,
    ComponentFactory<any>
  >();
  private _definition: ComponentDefinition<any> | undefined;
  private _formDef: FormDefinition = {
    title: '',
    description: '',
    width: '',
  };

  /**
   * 注册组件工厂
   * @param factory
   */
  registerFactory<T extends ComponentType>(factory: ComponentFactory<T>) {
    if (this._factoryStore.has(factory.type)) {
      console.log(`[warn] factory ${factory.type} is exist, ignore`);
      return;
    }

    this._factoryStore.set(factory.type, factory);
    this._factoryList.push(factory);

    if (factory.type == 'LinearLayout') {
      this._definition = factory.createComponentDefinition() as ComponentDefinition<any>;
    }
  }

  getFactoryByGroup(group: FactoryGroup): ComponentFactory<any>[] {
    return this._factoryList.filter((it) => it.group == group);
  }

  /**
   * 根据类型获取工厂
   * @param factoryType
   * @returns {*}
   */
  getFactory<T extends ComponentType>(factoryType: T): ComponentFactory<T> {
    return this._factoryStore.get(factoryType) as ComponentFactory<T>;
  }

  get definition() {
    return this._definition;
  }

  set definition(val: ComponentDefinition<any> | undefined) {
    this._definition = val;
  }

  get formDef() {
    return this._formDef;
  }

  set formDef(val: FormDefinition) {
    this._formDef = val;
  }

  get factoryList() {
    return this._factoryList;
  }

  getJsonData() {
    return {
      props: JSON.parse(JSON.stringify(this._definition)),
      form: JSON.parse(JSON.stringify(this._formDef)),
    };
  }
}

export default new FormStudio();
