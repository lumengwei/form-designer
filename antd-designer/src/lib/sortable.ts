import $ from "./jquery";
import {FormHelper} from "../designer/helper";
import FormStudio from "../../../src/FormStudio";
import {ComponentGroup} from "../designer/reactComponent";
import {ReactComponentGroupState, ReactComponentProps} from "../designer/types";

export function sortable<P extends ReactComponentProps<T>, T, S extends ReactComponentGroupState<T>>($node: HTMLElement | null
    , componentInst: ComponentGroup<P, T, S>
) {
    if ($node) {
        $($node).sortable({
            connectWith: 'parent',
            placeholder: 'form-placeholder-filed ',
            cancel: '.j_cancel-drag',
            stop(_: any, ui: any) {
                if (componentInst && FormHelper.componentFactory) {
                    componentInst.addChild($(ui.item).index(), FormHelper.componentFactory.createComponentDefinition())
                    $(ui.item).remove();
                }
            },
            over() {
                console.log('-> over');
                $(this).find('.form-placeholder-filed').show();
            },
            out() {
                console.log('-> out');
            },
            receive() {
                console.log('-> receive');
            },
        });

        // 移除子元素
        $($node).on('click', '.fm-btn-remove, .fm-btn-del', function (e: Event) {
            e.stopPropagation();
            const $com = $(this).closest('.component');
            if ($com.hasClass('active')) {
                FormHelper.activeComponentIns = null;
            }
            componentInst.removeChild($com.index());
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
