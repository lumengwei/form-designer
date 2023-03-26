import {ComponentDefinition, ComponentFactory, FactoryGroup, FormDefinition} from './types';


class FormStudio {
    private factoryList: ComponentFactory<any>[] = [];
    private factoryStore = new Map<string, ComponentFactory<any>>();
    private _definition: ComponentDefinition<any> | null = null;
    private _formDef: FormDefinition = {
        title: '',
        description: '',
        width: ''
    };


    /**
     * 注册组件工厂
     * @param factory
     */
    registerFactory<T>(factory: ComponentFactory<T>) {
        if (this.factoryStore.has(factory.type)) {
            console.log(`[warn] factory ${factory.type} is exist, ignore`);
            return;
        }

        this.factoryStore.set(factory.type, factory);
        this.factoryList.push(factory);

        if (factory.type == 'LinearLayout') {
            this._definition = factory.createComponentDefinition() as ComponentDefinition<any>;
        }
    }

    getFactoryList(group: FactoryGroup): ComponentFactory<any>[] {
        return this.factoryList.filter(it => it.group == group)
    }

    /**
     * 根据类型获取工厂
     * @param factoryType
     * @returns {*}
     */
    getFactory<T>(factoryType: string): ComponentFactory<T> {
        return this.factoryStore.get(factoryType) as ComponentFactory<T>;
    }

    factoryFilter(filter: (it: ComponentFactory<any>) => boolean) {
        return this.factoryList.filter(filter);
    }

    get definition() {
        return this._definition;
    }

    get fromDef() {
        return this._formDef;
    }


    getJsonData() {
        return {
            props: JSON.parse(JSON.stringify(this._definition)),
            form: JSON.parse(JSON.stringify(this._formDef)),
        };
    }
}

export default new FormStudio();
