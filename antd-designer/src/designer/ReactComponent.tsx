import {PureComponent} from 'react';
import {ReactComponentGroupState, ReactComponentProps, ReactComponentState} from "./types";
import {ComponentDefinition} from "../../../src/types";

export class ReactComponent<P extends ReactComponentProps<T>, T, S extends ReactComponentState> extends PureComponent<P, S> {
    componentWillMount() {
        const {definition: {type, title}} = this.props;
        if (!type || !title) {
            throw new Error(`type:${type}, title:${title} not defined in definition`);
        }
    }

    /**
     * shouldComponentUpdate 默认不是对象的深层比较，采用标志位的方式
     * 此方法代替foreUpdate
     */
    forceRender() {
        const {renderCounter} = this.state;
        this.setState({
            renderCounter: (renderCounter || 0) + 1
        })
    }
}

export class ComponentGroup<P extends ReactComponentProps<T>, T, S extends ReactComponentGroupState<T>> extends ReactComponent<P, T, S> {

    componentWillMount() {
        super.componentWillMount();
        const {definition: {children}} = this.props;
        if (!children || !Array.isArray(children)) {
            throw new Error(`children:${children} not defined in definition`);
        }
    }

    /**
     * 添加子组件
     * @param index
     * @param componentDefinition
     */
    addChildBySlot(slot: number, componentDefinition: ComponentDefinition<any>) {
        const {definition: {children}} = this.props;
        componentDefinition.slot = slot;
        children?.push(componentDefinition);
        this.forceUpdate()
    }

    /**
     * 移除子组件
     * @param index
     */
    removeChildBySlot(slot: number) {
        const {definition: {children}} = this.props;
        const child = children?.filter(it => it.slot == slot)[0]
        if (child) {
            children!.splice(children?.indexOf(child), 1)
            this.forceUpdate()
        }
    }

    /**
     * 移除子组件
     * @param index
     */
    removeChild(index: number) {
        const {definition: {children}} = this.props;
        children!.splice(index, 1)
        this.forceUpdate()
    }

    addChild(index: number, componentDefinition: ComponentDefinition<any>) {
        const {definition: {children}} = this.props;
        children!.splice(index, 0, componentDefinition)
        this.forceUpdate();
    }

    changeIndex(source: number, target: number) {
        const {definition: {children}} = this.props;
        const s = children![source];
        children![source] = children![target];
        children![target] = s;
        this.forceUpdate();
    }

    /**
     * 获取插槽上的组件
     * @param index
     * @param componentDefinition
     */
    getChildBySlot(slot: number): ComponentDefinition<any> | null {
        const {definition: {children}} = this.props;
        return children?.filter(it => it.slot == slot)[0] || null
    }

}

export class Layout<P extends ReactComponentProps<T>, T, S extends ReactComponentGroupState<T>> extends ComponentGroup<P, T, S> {

}
