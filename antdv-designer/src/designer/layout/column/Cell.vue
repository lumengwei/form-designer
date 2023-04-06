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
import {defineComponent, getCurrentInstance, onMounted, ref} from "vue";
import ComponentRender from "@/designer/wrapper/ComponentRender.vue";
import {sortable} from "@/lib/sortable";
import {ComponentGroup} from "@/VueComponents";

export default defineComponent({
  name: "Cell",
  components: {
    ComponentRender
  },
  props: {
    definition: Object,
    slotIndex: Number,
  },
  setup(props: any) {
    const refNode = ref<HTMLElement | null>(null);

    onMounted(() => {
      const inst = getCurrentInstance();
      if (inst) {
        sortable(refNode.value, inst.parent?.proxy as ComponentGroup, props.slotIndex, 1, true);
      }
    });

    return {
      refNode,
    }
  }
})
</script>

<style scoped>

</style>
