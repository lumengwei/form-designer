declare let $: any;

import FormStudio from '../FormStudio';

export function sortable(node: HTMLHtmlElement, component) {
  (function (n, c) {
    const $node = n;
    const componentInst = c;
    $($node).sortable({
      connectWith: 'parent',
      placeholder: 'form-placeholder-filed ',
      cancel: '.j_cancel-drag',
      stop(_, ui) {
        if (componentInst && FormStudio.draggedFactory) {
          console.log(FormStudio.draggedFactory);
          component.definition.children!.push(
            FormStudio.draggedFactory.createComponentDefinition()
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
    $($node).on('click', '.fm-btn-remove, .fm-btn-del', function (e) {
      e.stopPropagation();
      // @ts-ignore
      const $com = $(this).closest('.component');
      if ($com.hasClass('active')) {
        FormStudio.activeComponent = null;
      }
      componentInst.removeChild($com.index());
    });
  })(node, component);
}
