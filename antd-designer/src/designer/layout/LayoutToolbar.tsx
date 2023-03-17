import React, {PureComponent} from 'react';
import {DragOutlined, DeleteOutlined} from '@ant-design/icons';
import formViewStyle from "../formView.less"


interface Props {
    disable?: boolean;

    onRemove?(): void;
}

class LayoutToolbar extends PureComponent<Props> {

    render() {
        const {disable, onRemove} = this.props;

        if (disable) {
            return;
        }

        return (
            <div className={formViewStyle.formLayoutToolbar}>
        <span className='fm-btn' title="拖动">
         <DragOutlined/>
        </span>
                <span className='fm-btn fm-btn-del' onClick={onRemove} title="删除">
          <DeleteOutlined/>
        </span>
            </div>
        )
    }
}

export default LayoutToolbar;
