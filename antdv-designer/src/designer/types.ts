import { ComponentDefinition, ComponentType } from '@@/types';
import { ComponentInternalInstance } from '@vue/runtime-core';

export interface VueComponentProps<T extends ComponentType> {
  definition: ComponentDefinition<T>;

  onRemove?: () => void;
}

