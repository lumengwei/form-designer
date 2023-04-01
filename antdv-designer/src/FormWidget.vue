<template>
  <div
      title
      class="widgetItem"
      draggable="true"
      ref="refNode"
  >
    {{ componentFactory.title }}
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import {draggable} from "@/lib/sortable";

export default defineComponent({
  name: 'FormWidget',
  props: {
    type: String,
    title: String,
  },

  setup(props) {
    const refNode = ref(null);

    onMounted(() => {
      draggable(refNode, props.type!)
    });

    return {
      onMouseDown,
      onMouseUp,
      refNode,
    };
  },
})
</script>

<style scoped lang="less">
@import "../src/style/component.less";
</style>
