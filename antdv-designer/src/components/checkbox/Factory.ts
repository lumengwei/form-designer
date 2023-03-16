import {ComponentDefinition, ComponentFactory, FieldDefinition} from "../../../../src/types";
import {CheckboxProps} from "../../../../src/props";


const Factory: ComponentFactory<CheckboxProps> = {
    title: '多选框',
    type: 'Checkbox',
    createComponentDefinition(): ComponentDefinition<CheckboxProps> & FieldDefinition {
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
    },
};

export default Factory;
