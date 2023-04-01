<template>
  <layout-wrapper :toolbar-able="toolbarAble" :active="isActive">
    <div class="ui-sortable" ref="refNode">
      <template v-if="definition.children">
        <template v-for="it in definition.children" :key="it.type">
          <Component :is="getComponent(it.type)"/>
        </template>
      </template>
    </div>
  </layout-wrapper>
</template>
<script lang="ts">
import LayoutWrapper from '../../wrapper/LayoutWrapper.vue';

import {defineComponent, getCurrentInstance, onMounted, ref} from 'vue';
import {sortable} from "@/lib/sortable";
import Factory from './Factory';
import {FormHelper, useVueComponentGroup} from "@/helper";
import {ComponentGroup} from "../../VueComponents";

export default defineComponent({
  name: Factory.type,
  components: {
    LayoutWrapper,
  },
  props: {
    toolbarAble: {
      type: Boolean,
      default() {
        return true;
      },
    },
    definition: {
      type: Object,
      default() {
        return Factory.createComponentDefinition();
      },
    },
  },
  setup() {
    const refNode = ref<HTMLElement | null>(null);
    const isActive = ref<boolean>(false);

    const groupMethods = useVueComponentGroup();

    onMounted(() => {
      const inst = getCurrentInstance();
      if (inst) {
        sortable(refNode.value, inst as ComponentGroup);
      }

    });

    function getComponent(type: string) {
      return FormHelper.getComponent(type)
    }

    return {
      refNode,
      isActive,
      getComponent,
      ...groupMethods
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
