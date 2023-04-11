<template>
  <div class="ui-sortable" ref="refNode">
    <ComponentRender
        v-if="definition.children"
        v-for="(it, index) in definition.children"
        :key="it.type+'-'+it.id"
        :definition="it"
        v-on:on-delete="removeChild(index)"
    />
  </div>
</template>
<script lang="ts">
import LayoutWrapper from '../../wrapper/LayoutWrapper.vue';

import {defineComponent, getCurrentInstance, onMounted, ref} from 'vue';
import {sortable} from "@/lib/sortable";
import LinearLayoutFactory from '@@/factory/LinearLayoutFactory';
import {useVueComponentGroup} from "@/designer/helper";
import {ComponentGroup} from "../../../VueComponents";
import ComponentWrapper from "@/designer/wrapper/ComponentWrapper.vue";
import {ComponentDefinition, FactoryGroup} from "@@/types";
import ComponentRender from "@/designer/wrapper/ComponentRender.vue";
import {LinearLayoutProps} from "@@/props";


function Definition() {
  return {} as ComponentDefinition<LinearLayoutProps>
}


export default defineComponent({
  name: LinearLayoutFactory.type,
  components: {
    ComponentRender,
    ComponentWrapper,
    LayoutWrapper,
  },
  props: {
    definition: {
      type: Definition,
      default() {
        return LinearLayoutFactory.createComponentDefinition();
      },
    },
  },
  setup() {
    const refNode = ref<HTMLElement | null>(null);
    const groupMethods = useVueComponentGroup();

    onMounted(() => {
      const inst = getCurrentInstance();
      if (inst) {
        sortable(refNode.value, inst.proxy as ComponentGroup);
      }
    });

    return {
      refNode,
      ...groupMethods,
    };
  },
})
</script>

<style scoped lang="less">
.ui-sortable {
  width: 100%;
  min-height: 50px;
}
</style>
