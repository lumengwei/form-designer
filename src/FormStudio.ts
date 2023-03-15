import {ComponentDefinition, ComponentFactory} from './types';

const factoryStore = new Map<string, ComponentFactory<any>>();

const factoryList: ComponentFactory<any>[] = [];

class FormStudio {
    private _draggedFactory: ComponentFactory<any> | null = null;

    // 处于拖拽状态下的组件工厂
    private _propsEditor = null; // 属性编辑器

    private _activeComponent = null; // 当前被激活的组件

    private _definition: ComponentDefinition<any> | null = null;

    /**
     * 注册组件工厂
     * @param factory
     */
    registerFactory<T>(factory: ComponentFactory<T>) {
        if (factoryStore.has(factory.type)) {
            console.log(`[warn] factory ${factory.type} is exist, ignore`);
            return;
        }

        factoryStore.set(factory.type, factory);
        factoryList.push(factory);

        if (factory.type == 'LinearLayout') {
            this._definition = factory.createComponentDefinition() as ComponentDefinition<any>;
        }
    }

    /**
     * 根据类型获取工厂
     * @param factoryType
     * @returns {*}
     */
    getFactory<T>(factoryType: string): ComponentFactory<T> {
        return factoryStore.get(factoryType) as ComponentFactory<T>;
    }

    factoryFilter(filter: (it: ComponentFactory<any>) => boolean) {
        return factoryList.filter(filter);
    }

    get draggedFactory() {
        return this._draggedFactory;
    }

    set draggedFactory(factory: ComponentFactory<any> | null) {
        this._draggedFactory = factory;
    }

    set activeComponent(component) {
        this._activeComponent = component;
    }

    get activeComponent() {
        return this._activeComponent;
    }

    get propsEditor() {
        return this._propsEditor;
    }

    set propsEditor(propsEditor: any) {
        this._propsEditor = propsEditor;
    }

    getJsonData() {
        return JSON.parse(JSON.stringify(this._definition));
    }
}

export default new FormStudio();
