export interface Component {
    title: string;
    readonly type: string;
}

export interface FormDefinition {
    title: string;
    description: string;
    width: string;
}


/**
 * 字段定义
 */
export type FieldDefinition = {
    fieldId: string;
    fieldName: string;
    fieldType: FieldType;
    length?: number,
    scale?: number
}

/**
 * 组件定义
 */
export interface ComponentDefinition<T> extends Component {
    /**
     * 作为一个子组件时，所在父组件中的位置（这个数据不一定在父组件中起作用）
     */
    id: string;
    slot?: number;
    props?: T;
    children?: ComponentDefinition<any>[];
    title: string;
    fieldDef?: FieldDefinition;
    rules?: FieldRule[];
}


export enum FactoryGroup {
    'Layout' = '布局组件',
    'Component' = '表单组件'
}

/**
 * 组件工厂
 * 负责创建组件的定义
 */
export interface ComponentFactory<T> extends Component {
    readonly group: FactoryGroup;

    createComponentDefinition: () => ComponentDefinition<T>;
}


/**
 * 组件工厂
 * 负责创建组件的定义
 */
export interface FieldFactory<T> extends ComponentFactory<T> {
    readonly group: FactoryGroup;

    createComponentDefinition: () => ComponentDefinition<T> & { fieldDef: FieldDefinition };
}


export interface ComponentFactoryConstructor<T> {
    new(): ComponentFactory<T>;
}

export const FieldTypes: { [key: string]: string } = {
    'string': 'STRING',
    'timestamp': 'TIMESTAMP',
    'date': 'DATE',
    'varchar': 'VARCHAR',
    'decimal': 'DECIMAL',
    'int8': 'INT8',
    'int16': 'INT16',
    'int32': 'INT32',
    'int64': 'INT64',
    'boolean': 'BOOLEAN',
    'array': 'ARRAY'
};

export type FieldType =
    'string'
    | 'timestamp'
    | 'date'
    | 'varchar'
    | 'decimal'
    | 'int8'
    | 'int16'
    | 'int32'
    | 'int64'
    | 'boolean'
    | 'array';

export type FieldRuleType =
    'string'
    | 'number'
    | 'boolean'
    | 'method'
    | 'regexp'
    | 'integer'
    | 'float'
    | 'object'
    | 'enum'
    | 'date'
    | 'url'
    | 'hex'
    | 'email'
    ;

export interface FieldRule {
    type?: FieldRuleType;
    len?: number;
    max?: number;
    min: number;
    message: string;
}
