import {FactoryGroup, FieldFactory, FieldType} from "@@/types";
import {InputProps} from "@@/props";
import {makeComponentId, makeFieldId} from "@@/utils";

class InputFactory implements FieldFactory<InputProps> {
    readonly type = "Input"
    readonly group = FactoryGroup.Component;

    title = "单行输入框"

    /**
     * 初始化一个组件定义
     * @returns {{type: string, title: string}}
     */
    createComponentDefinition() {
        return {
            id: makeComponentId(),
            type: this.type,
            title: this.title,
            fieldDef: {
                fieldId: makeFieldId(),
                fieldType: 'varchar' as FieldType,
                fieldName: ''
            },
            props: {
                placeholder: '请输入'
            },
        }
    }
}

export default new InputFactory();
