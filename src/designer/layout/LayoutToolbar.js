import React, { PureComponent } from 'react';
import { DeleteOutlined, DragOutlined } from '@ant-design/icons';
import '../formView.less';

class LayoutToolbar extends PureComponent {
  render() {
    const { disable, onRemove } = this.props;

    if (disable) {
      return;
    }

    return (
      <div className="form-layout-toolbar">
        <span className="fm-btn fm-btn-drag" title="拖动">
          <DragOutlined />
        </span>
        <span className="fm-btn fm-btn-del" onClick={onRemove} title="删除">
          <DeleteOutlined />
        </span>
      </div>
    );
  }
}

export default LayoutToolbar;
