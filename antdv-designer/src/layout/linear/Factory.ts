import type {ComponentFactory} from "../../../../src/types";
import {FactoryGroup} from "../../../../src/types";
import {ColumnLayoutProps} from "../../../../src/props";

class Factory implements ComponentFactory<ColumnLayoutProps> {
    readonly group = FactoryGroup.Layout;
    readonly type = 'LinearLayout';
    title = '流式布局';

    createComponentDefinition() {
        return {
            type: this.type,
            title: this.title,
            children: [],
        };
    }

};

export default new Factory();
