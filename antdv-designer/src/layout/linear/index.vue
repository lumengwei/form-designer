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

import {getCurrentInstance, onMounted, ref} from 'vue';
import {sortable} from "@/lib/sortable";
import Factory from './Factory';
import {getComponent} from "../../ComponentDef";

export default {
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
    const refNode = ref(null);
    const isActive = ref(false);

    onMounted(() => {
      sortable(refNode.value, getCurrentInstance());
    });

    function setActive(active) {
      isActive.value = active;
    }

    return {
      refNode,
      isActive,
      setActive,
      getComponent,
    };
  },
};
</script>

<style scoped lang="less">
.ui-sortable {
  width: 100%;
  min-height: 50px;
}
</style>
