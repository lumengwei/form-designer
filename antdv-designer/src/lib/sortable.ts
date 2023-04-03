import $ from "./jquery";
import {ReactComponentProps} from "../../../antd-designer/src/designer/types";
import {FormHelper} from "@/designer/helper";
import FormStudio from "@@/FormStudio";
import {ComponentGroup} from "../VueComponents";
import SortableUIParams = JQueryUI.SortableUIParams;


/**
 *
 * @param $node
 * @param componentInst
 * @param slotIndex 插槽位置
 * @param limitSize 子元素最大个数
 * @param limitToDisable 如果子元素满额时，禁用sortable
 */
export function sortable<P extends ReactComponentProps<T>, T>($node: HTMLElement | null
    , componentInst: ComponentGroup, slotIndex?: number, limitSize?: number, limitToDisable?: boolean
) {
    if ($node) {
        let sourceIndex = 0;
        $($node).sortable({
            connectWith: 'parent',
            placeholder: 'form-placeholder-filed ',
            cancel: '.j_cancel-drag',
            stop(e: JQueryEventObject, ui: SortableUIParams) {
                console.log('stop', e, ui)
                if ($($node).children().length > limitSize!) {
                    $(ui.item).remove();
                    return;
                } else {
                    if (componentInst && FormHelper.componentFactory) {
                        // 查润新的组件
                        if (slotIndex === undefined) {
                            componentInst.addChild($(ui.item).index(), FormHelper.componentFactory.createComponentDefinition())
                        } else {
                            componentInst.addChildBySlot(slotIndex, FormHelper.componentFactory.createComponentDefinition())
                        }
                        $(ui.item).remove();

                        if (limitToDisable && $($node).children().length >= limitSize!) {
                            $($node).sortable("disable")
                        }
                    } else {
                        // 组件排序
                        componentInst.changeIndex(sourceIndex, $(ui.item).index())
                    }

                }
            },
            over(e: JQueryEventObject, ui: SortableUIParams) {
                if ($($node).children().length > limitSize!) {
                    return;
                } else {
                    $($node).find('.form-placeholder-filed').show();
                }

            },
            activate(e: JQueryEventObject, ui: SortableUIParams) {
                console.log('activate', e, ui)
                sourceIndex = $(ui.item).index();
            },
            out(e: JQueryEventObject, ui: SortableUIParams) {
            },
            receive(e: JQueryEventObject, ui: SortableUIParams) {
            },
        });
    } else {
        console.log($node)
    }
}


export function draggable(node: HTMLElement | null, factoryType: string) {
    if (node) {
        $(node).draggable({
            connectToSortable: ".ui-sortable",
            helper: "clone",
            opacity: .8,
            appendTo: "body",
            start() {
                FormHelper.componentFactory = FormStudio.getFactory(factoryType);
            },
            stop() {
                FormHelper.componentFactory = null;
            }
        }).disableSelection();
    } else {
        console.log(node)
    }
}
