<template>
  <div class="cell" ref="refNode">
    <ComponentRender
        v-if="definition != null"
        :definition="definition"
        v-bind="$attrs"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, getCurrentInstance, onMounted, ref, PropType} from "vue";
import ComponentRender from "../../wrapper/ComponentRender.vue";
import {sortable} from "../../lib/sortable";
import {ComponentGroup} from "../../VueComponents";
import {ComponentDefinition} from '@@/types'

export default defineComponent({
  name: 'Cell',
  components: {
    ComponentRender,
  },
  props: {
    definition: {
      type: Object as PropType<ComponentDefinition<any>>,
    },
    slotIndex: {
      type: Number,
      required: true,
    },
  },
  setup(props: any) {
    const refNode = ref<HTMLElement | null>(null);

    onMounted(() => {
      const inst = getCurrentInstance();
      if (inst) {
        sortable(refNode.value, inst.parent?.proxy as ComponentGroup, {
          slotIndex: props.slotIndex,
          limitSize: 1,
        });
      }
    });

    return {
      refNode,
    };
  },
});
</script>

<style scoped>

</style>
