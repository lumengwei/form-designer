import {ComponentDefinition, ComponentFactory, FactoryGroup} from "../../../../src/types";
import {CheckboxProps} from "../../../../src/props";


class Factory implements ComponentFactory<CheckboxProps> {
    readonly group = FactoryGroup.Component;
    readonly type = 'Checkbox';
    title = '多选框';

    createComponentDefinition(): ComponentDefinition<CheckboxProps> {
        return {
            type: this.type,
            title: this.title,
            fieldDef: {
                fieldType: '',
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
