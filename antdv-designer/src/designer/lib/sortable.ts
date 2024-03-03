import {FormHelper} from "../helper";
import {ComponentGroup} from "../VueComponents";
import Sortable from 'sortablejs';
import {ComponentFactory} from '@@/types'

export type SortableParam = {
    slotIndex?: number;
    limitSize?: number;
} & Sortable.Options;

/**
 *
 * @param $node
 * @param componentInst
 * @param slotIndex 插槽位置
 * @param limitSize 子元素最大个数
 * @param limitToDisable 如果子元素满额时，禁用sortable
 */
export function sortable(
    $node: HTMLElement | null,
    componentInst: ComponentGroup,
    params: SortableParam
) {
    if (!$node) {
        return;
    }
    const groupName = `cps-${Date.now()}`;
    Sortable.create($node, {
        group: {
            name: groupName,
            pull: [groupName], // 是否可以移动到其他组
            put: ['widgetList'], // 是否可以从其他组添加到改组
        },
        ghostClass: 'form-placeholder-filed',
        onStart(e) {
            console.log('sortable onStart', e);
        },
        onEnd(e) {
            console.log('sortable onEnd', e);
            // 组件排序
            componentInst.changeSlot(e.oldIndex!, e.newIndex!);
        },
        onAdd(e) {
            console.log('sortable onAdd', e);
            // 新的组建添加
            const $item = e.item;

            // 指定slotIndex
            const slotIndex: number = params.slotIndex ?? e.newIndex!;
            let childrenSize: number = $item.parentNode ? $item.parentNode.children.length : 0;

            // 元素已被添加到document中, 需要
            if (childrenSize > 0) {
                childrenSize = childrenSize - 1;
            }

            // 移除目标节点
            $item.remove();

            if (params && params.limitSize) {
                // 超过限制
                if (childrenSize > params.limitSize!) {
                    return;
                }
            }

            const comDef = FormHelper.componentFactory?.createComponentDefinition();
            if (comDef) {
                // 添加组建定义
                componentInst.addChild(slotIndex, comDef);

                // 根据index 重置slot
                componentInst.resetSlot();
            }

            if (params) {
                if (params.limitSize && childrenSize + 1 >= params.limitSize) {
                    // $($node).sortable('disable');
                }
            }
        },
    });
}

export function draggable($node: HTMLElement | null, factoryList: ComponentFactory<any>[]) {
    if (!$node) {
        return;
    }
    Sortable.create($node, {
        group: {
            name: 'widgetList',
            pull: 'clone', // 是否可以移动到其他组
            put: false, // 是否可以从其他组添加到改组
        },
        ghostClass: 'form-placeholder-filed',
        sort: false,
        onStart(e) {
            console.log('draggable onStart', e);
            const factory = factoryList[e.oldIndex!];
            if (factory) {
                FormHelper.componentFactory = factory;
            }
        },
        onEnd(e: Sortable.SortableEvent) {
            console.log('draggable onEnd', e);
            FormHelper.componentFactory = null;
        },
    });
}
