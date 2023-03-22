import type {ComponentFactory} from "../../../../src/types";
import {FactoryGroup} from "../../../../src/types";
import {ColumnLayoutProps} from "../../../../src/props";
import {makeComponentId} from "../../../../src/utils";

class Factory implements ComponentFactory<ColumnLayoutProps> {
    readonly group = FactoryGroup.Layout;
    readonly type = 'ColumnLayout';
    title = '列布局';

    createComponentDefinition() {
        return {
            id: makeComponentId(),
            type: this.type,
            title: this.title,
            props: {
                columnNum: 3,
            },
            children: [],
        };
    }

};

export default new Factory();
