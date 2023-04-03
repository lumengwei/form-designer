import {ComponentDefinition, ComponentFactory, FactoryGroup, FieldType} from "@@/types";
import {CheckboxProps} from "@@/props";
import {makeComponentId, makeFieldId} from "@@/utils";

class Factory implements ComponentFactory<CheckboxProps> {
    readonly group = FactoryGroup.Component;
    readonly type = 'Checkbox';
    title = '多选框';

    createComponentDefinition(): ComponentDefinition<CheckboxProps> {
        return {
            id: makeComponentId(),
            type: this.type,
            title: this.title,
            fieldDef: {
                fieldId: makeFieldId(),
                fieldType: 'array' as FieldType,
                fieldName: '',
            },
            props: {
                placeholder: '请输入',
                options: [{label: '显示值', value: '真值', checked: false, disabled: true}],
            },
        };
    }
}

export default new Factory();
