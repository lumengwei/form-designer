import React from 'react';
import uniqueId from 'lodash/uniqueId';
import Sortable from '../../lib/Sortable';
import { FactoryRegister } from '../warpper';
// import { sortable } from '../../lib/sortable';
import FormStudio from '../../util/FormStudio';
import { sorting } from '../../util/MiscUtil';
import { Layout } from '../component';
import LayoutWrapper from './LayoutWrapper';
import FormViewContext from '../FormViewContext';
import $ from 'jquery';

/**
 * 这是一个特殊的布局,里面的元素可以拖拽
 */
@LayoutWrapper({
  focusAble: false,
  toolbarAble: false,
  layoutStyle: {
    display: 'flex',
    position: 'relative',
    // width: 'auto',
    minHeight: '50px',
  },
})
class LinearLayout extends Layout {
  childrens = [];

  renderChildren() {
    const {
      definition: { children },
    } = this.props;
    return children.map(item =>
      FormStudio.getFactory(item.type).renderComponenet(item)({
        key: uniqueId(),
        updateActive() {
          this.onActive();
        },
        ref: node => {
          if (node) {
            this.childrens.push(node);
          }
        },
      }),
    );
  }

  componentDidMount() {
    if (this.node) {
      const componentInst = this;
      // 移除子元素
      $(this.node).on('click', '.fm-btn-remove, .fm-btn-del', function(e) {
        e.stopPropagation();
        const $com = $(this).closest('.component');
        if ($com.hasClass('active')) {
          FormStudio.activeComponent = null;
        }
        componentInst.removeChild($com.index());
      });
    }
  }

  render() {
    const {
      definition: { children },
    } = this.props;
    const childrens = this.renderChildren();
    return (
      <FormViewContext.Consumer>
        {({ edit }) => (
          <Sortable
            ref={el => {
              if (el) {
                this.node = el.node;
              }
            }}
            className="linear-layout"
            options={{
              animation: 150,
              handle: '.component-field,.component-layout,.form-layout-toolbar .fm-btn-drag',
              group: 'form',
              disabled: !edit,
              dataIdAttr: 'data-id',
              ghostClass: 'linear-sortable-ghost',
              onRemove: (/** Event */ evt) => {
                children.splice(evt.oldIndex, 1);
              },
              onStart: evt => {
                FormStudio.transferSource = children[evt.oldIndex];
              },
              onEnd: evt => {
                FormStudio.transferSource = null;
                FormStudio.topLayout.forceRender();
              },
              onAdd: evt => {
                if ($(evt.from).hasClass('linear-layout')) {
                  children.splice(evt.newIndex, 0, FormStudio.transferSource);
                } else if (FormStudio.draggedFactory) {
                  this.addChild(
                    evt.newIndex,
                    FormStudio.draggedFactory.createComponentDefinition(),
                  );
                }
              },
              // 同一组内移动
              onUpdate: evt => {
                sorting(children, evt.oldIndex, evt.newIndex);
                this.forceRender();
              },
            }}
            onChange={(order, sortable, evt) => {}}
          >
            {childrens}
          </Sortable>
        )}
      </FormViewContext.Consumer>
    );
  }
}

@FactoryRegister(LinearLayout)
class LinearLayoutFactory {
  type = 'LinearLayout';

  title = '流式布局';

  /**
   * 初始化一个组件定义
   * @returns {{type: string, title: string}}
   */
  createComponentDefinition() {
    return {
      type: this.type,
      title: this.title,
      props: {},
      children: [],
    };
  }
}

export default LinearLayoutFactory;
