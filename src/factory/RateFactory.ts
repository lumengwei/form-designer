import {FactoryGroup, FieldFactory, FieldType} from "@@/types";
import {RateProps} from "@@/props";
import {makeComponentId, makeFieldId} from "@@/utils";

class RateFactory implements FieldFactory<RateProps> {
    readonly type = "Rate"
    readonly group = FactoryGroup.Component;
    title = "评分"

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
                fieldName: '',
            },
            props: {
                count: 5
            },
        }
    }
}

export default new RateFactory();
