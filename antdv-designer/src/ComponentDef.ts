import { DefineComponent } from '@vue/runtime-core';

const component_map = new Map<String, DefineComponent>();

export function registerComponent(defineComponent: DefineComponent) {
  component_map.set(defineComponent.name, defineComponent);
}

export function getComponent(type: string) {
  console.log(component_map);
  return component_map.get(type);
}
