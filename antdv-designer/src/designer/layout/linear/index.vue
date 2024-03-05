<template>
  <div class="ui-sortable" ref="refNode">
    <template v-if="definition.children">
      <ComponentRender
          v-for="(it, index) in childrenList"
          :key="it.id"
          :definition="it"
          @on-delete="removeChild(index)"
      />
    </template>
  </div>
</template>
<script lang="ts">
import {defineComponent, getCurrentInstance, onMounted, PropType, ref, computed} from 'vue';
import {sortable} from "../../lib/sortable";
import LinearLayoutFactory from '@@/factory/LinearLayoutFactory';
import {useVueComponentGroup} from "@/designer/helper";
import {ComponentGroup} from "@/designer/VueComponents";
import {ComponentDefinition} from "@@/types";
import ComponentRender from "@/designer/wrapper/ComponentRender.vue";

export default defineComponent({
  name: LinearLayoutFactory.type,
  components: {
    ComponentRender,
  },
  props: {
    definition: {
      type: Object as PropType<ComponentDefinition<'LinearLayout'>>,
      required: true,
      default() {
        return LinearLayoutFactory.createComponentDefinition();
      },
    },
  },
  setup(props) {
    const refNode = ref<HTMLElement | null>(null);
    const groupMethods = useVueComponentGroup();

    onMounted(() => {
      const inst = getCurrentInstance();
      if (inst) {
        sortable(refNode.value, inst.proxy as ComponentGroup, {});
      }
    });

    const childrenList = computed(() => {
      return props.definition.children?.filter(Boolean);
    });

    return {
      refNode,
      childrenList,
      ...groupMethods,
    };
  },
});
</script>

<style scoped lang="less">
.ui-sortable {
  width: 100%;
  min-height: 50px;
}
</style>
