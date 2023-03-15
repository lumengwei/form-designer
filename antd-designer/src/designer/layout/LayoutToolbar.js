import React,{PureComponent} from 'react';
import {Icon} from 'antd';
import formViewStyle from '../formView.less'

class LayoutToolbar extends PureComponent{

  render(){
    const { disable, onRemove } = this.props;

    if(disable){
      return ;
    }

    return (
      <div className={formViewStyle.formLayoutToolbar}>
        <span className='fm-btn' title="拖动">
          <Icon type="drag" />
        </span>
        <span className='fm-btn fm-btn-del' onClick={onRemove} title="删除">
          <Icon type="delete" />
        </span>
      </div>
    )
  }
}

export default LayoutToolbar;
