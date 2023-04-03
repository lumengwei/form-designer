import type {ComponentFactory} from "@@/types";
import {FactoryGroup} from "@@/types";
import {ColumnLayoutProps} from "@@/props";
import {makeComponentId} from "@@/utils";

class Factory implements ComponentFactory<ColumnLayoutProps> {
    readonly group = FactoryGroup.Layout;
    readonly type = 'LinearLayout';
    title = '流式布局';

    createComponentDefinition() {
        return {
            id: makeComponentId(),
            type: this.type,
            title: this.title,
            children: [],
        };
    }

};

export default new Factory();
