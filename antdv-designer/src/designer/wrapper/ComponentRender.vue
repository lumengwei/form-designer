<template>
  <ComponentWrapper
      v-if="isGroup(FactoryGroup.Component)"
      :title="definition.title"
      v-on:on-delete="onDelete"
      v-on:on-active="onActive"
      :active="active"
  >
    <Component :is="getComponent(definition.type)" :definition="definition" ref="refCom"/>
  </ComponentWrapper>
  <LayoutWrapper
      v-else
      v-on:on-delete="onDelete"
      v-on:on-active="onActive"
      :active="active"
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
    active: Boolean,
    definition: Object
  },
  emits: ['onDelete', 'onActive'],
  setup(props: any, ctx: any) {

    const refCom = ref();
    const inst = getCurrentInstance();

    function onDelete() {
      ctx.emit('onDelete')
    }

    function onActive() {
      FormHelper.activeComponentIns = inst?.proxy
      ctx.emit('onActive')
    }

    onUpdated(() => {
      refCom.value!.$forceUpdate();
    })

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
      onActive
    }
  }
})
</script>

<style scoped>

</style>
