import $ from "./jquery";
import {FormHelper} from "../designer/helper";
import FormStudio from "../../../src/FormStudio";
import {ComponentGroup} from "../designer/ReactComponent";
import {ReactComponentGroupState, ReactComponentProps} from "../designer/types";
import SortableUIParams = JQueryUI.SortableUIParams;

/**
 *
 * @param $node
 * @param componentInst
 * @param slotIndex 插槽位置
 * @param limitSize 子元素最大个数
 * @param limitToDisable 如果子元素满额时，禁用sortable
 */
export function sortable<P extends ReactComponentProps<T>, T, S extends ReactComponentGroupState<T>>($node: HTMLElement | null
    , componentInst: ComponentGroup<P, T, S>, slotIndex?: number, limitSize?: number, limitToDisable?: boolean
) {
    if ($node) {
        $($node).sortable({
            connectWith: 'parent',
            placeholder: 'form-placeholder-filed ',
            cancel: '.j_cancel-drag',
            stop(e: JQueryEventObject, ui: SortableUIParams) {
                if ($(this).children().length > limitSize!) {
                    $(ui.item).remove();
                    return;
                } else {
                    if (componentInst && FormHelper.componentFactory) {
                        if (slotIndex === undefined) {
                            componentInst.addChild($(ui.item).index(), FormHelper.componentFactory.createComponentDefinition())
                        } else {
                            componentInst.addChildBySlot(slotIndex, FormHelper.componentFactory.createComponentDefinition())
                        }
                    }

                    if (limitToDisable && $(this).children().length >= limitSize!) {
                        $($node).sortable("disable")
                    }
                    $(ui.item).remove();
                }
            },
            over(e: JQueryEventObject, ui: SortableUIParams) {
                if ($(this).children().length > limitSize!) {
                    return;
                } else {
                    $(this).find('.form-placeholder-filed').show();
                }

            },
            out() {
            },
            receive() {
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
