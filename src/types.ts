export interface Component {
    title: string;
    type: string;
}

/**
 * 字段定义
 */
export interface FieldDefinition {
    fieldName: string;
    fieldType: string;
}

/**
 * 组件定义
 */
export interface ComponentDefinition<T> extends Component {
    props?: T;
    children?: ComponentDefinition<any>[];
    fieldDef?: FieldDefinition;
}


/**
 * 组件工厂
 * 负责创建组件的定义
 */
export interface ComponentFactory<T> extends Component {
    createComponentDefinition: () => ComponentDefinition<T>;
}

export interface ComponentFactoryConstructor<T> {
    new(): ComponentFactory<T>;
}
