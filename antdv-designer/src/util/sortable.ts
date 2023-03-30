import {FormHelper} from "/@/helper";

declare let $: any;


export function sortable(node: HTMLHtmlElement, component: any) {
    (function (n, c) {
        const $node = n;
        const componentInst = c;
        $($node).sortable({
            connectWith: 'parent',
            placeholder: 'form-placeholder-filed ',
            cancel: '.j_cancel-drag',
            stop(_: any, ui: any) {
                if (componentInst && FormHelper.componentFactory) {
                    console.log(FormHelper.componentFactory);
                    component.definition.children!.push(
                        FormHelper.componentFactory.createComponentDefinition()
                    );
                    $(ui.item).remove();
                }
                // return true;
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
            // @ts-ignore
            const $com = $(this).closest('.component');
            if ($com.hasClass('active')) {
                FormHelper.activeComponentIns = null;
            }
            componentInst.removeChild($com.index());
        });
    })(node, component);
}
