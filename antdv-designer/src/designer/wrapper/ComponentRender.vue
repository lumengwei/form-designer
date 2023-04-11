<template>
  <ComponentWrapper
      v-if="isGroup(FactoryGroup.Component)"
      :title="definition.title"
      v-on:on-delete="onDelete"
      v-on:on-active="onActive"
      :active="isActive(definition)"
  >
    <Component :is="getComponent(definition.type)" :definition="definition" ref="refCom"/>
  </ComponentWrapper>
  <LayoutWrapper
      v-else
      v-on:on-delete="onDelete"
      v-on:on-active="onActive"
      :active="isActive(definition)"
  >
    <Component :is="getComponent(definition.type)" :definition="definition" ref="refCom"/>
  </LayoutWrapper>
</template>

<script lang="ts">

import {defineComponent, getCurrentInstance, onUpdated, ref} from "vue";
import {DefineComponent} from "@vue/runtime-core";
import {FormHelper} from "../helper";
import FormStudio from "@@/FormStudio";
import {FactoryGroup} from "@@/types";
import ComponentWrapper from "@/designer/wrapper/ComponentWrapper.vue";
import LayoutWrapper from "@/designer/wrapper/LayoutWrapper.vue";

export default defineComponent({
  name: "ComponentRender",
  components: {
    LayoutWrapper,
    ComponentWrapper
  },
  props: {
    definition: Object
  },
  emits: ['onDelete'],
  setup(props: any, ctx: any) {

    const refCom = ref();
    const inst = getCurrentInstance();

    function onDelete() {
      ctx.emit('onDelete')
    }

    function onActive() {
      FormHelper.activeComponentIns = inst?.proxy;
    }

    onUpdated(() => {
      refCom.value!.$forceUpdate();
    })

    function isActive(it: any) {
      return FormHelper.activeComponentId == it.id;
    }

    function isGroup(group: FactoryGroup) {
      return FormStudio.getFactory(props.definition.type).group == group;
    }

    function getComponent(type: string): DefineComponent {
      return FormHelper.getComponent(type)
    }

    return {
      refCom,
      getComponent,
      isGroup,
      FactoryGroup,
      onDelete,
      onActive,
      isActive
    }
  }
})
</script>

<style scoped>

</style>
