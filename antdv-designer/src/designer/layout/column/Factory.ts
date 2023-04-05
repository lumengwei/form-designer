import type {ComponentFactory} from "@@/types";
import {FactoryGroup} from "@@/types";
import {ColumnLayoutProps} from "@@/props";
import {makeComponentId} from "@@/utils";

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
                columnNum: 2,
            },
            children: [],
        };
    }

};

export default new Factory();
