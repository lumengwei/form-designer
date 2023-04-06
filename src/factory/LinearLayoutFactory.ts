import {ComponentDefinition, ComponentFactory, FactoryGroup} from "@@/types";
import {LinearLayoutProps} from "@@/props";
import {makeComponentId} from "@@/utils";

class LinearLayoutFactory implements ComponentFactory<LinearLayoutProps> {
    readonly type = "LinearLayout"
    readonly group = FactoryGroup.Layout;
    title = "流式布局"


    /**
     * 初始化一个组件定义
     * @returns {{type: string, title: string}}
     */
    createComponentDefinition(): ComponentDefinition<LinearLayoutProps> {
        return {
            id: makeComponentId(),
            type: this.type,
            title: this.title,
            props: {
                direction: 'column'
            },
            children: []
        }
    }
}

export default new LinearLayoutFactory();
