<template>
  <ComponentWrapper
      v-if="isGroup(FactoryGroup.Component)"
      :definition="definition"
      v-on:on-delete="onDelete"
      v-on:on-active="onActive"
      :active="active"
  >
    <Component :is="getComponent(definition.type)" :definition="definition"/>
  </ComponentWrapper>
  <LayoutWrapper
      v-else
      v-on:on-delete="onDelete"
      v-on:on-active="onActive"
      :active="active"
  >
    <Component :is="getComponent(definition.type)" :definition="definition"/>
  </LayoutWrapper>
</template>

<script lang="ts">

import {defineComponent} from "vue";
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

    function onDelete() {
      ctx.emit('onDelete')
    }

    function onActive() {
      ctx.emit('onActive')
    }

    function isGroup(group: FactoryGroup) {
      return FormStudio.getFactory(props.definition.type).group == group;
    }

    function getComponent(type: string): DefineComponent {
      return FormHelper.getComponent(type)
    }

    return {
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
