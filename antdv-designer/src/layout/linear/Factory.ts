import type {ComponentFactory} from "../../../../src/types";

const Factory: ComponentFactory<any> = {
  title: '流式布局',
  type: 'LinearLayout',
  createComponentDefinition() {
    return {
      type: this.type,
      title: this.title,
      children: [],
    };
  },
};

export default Factory;