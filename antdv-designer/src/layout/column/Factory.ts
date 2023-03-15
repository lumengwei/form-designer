import { ComponentFactory } from '/@/modules/form/views/designer/types';

export type ColumnLayoutProps = {
  columnNum: number;
};

const Factory: ComponentFactory<ColumnLayoutProps> = {
  title: '列布局',
  type: 'ColumnLayout',
  createComponentDefinition() {
    return {
      type: this.type,
      title: this.title,
      props: {
        columnNum: 3,
      },
      children: [],
    };
  },
};

export default Factory;
