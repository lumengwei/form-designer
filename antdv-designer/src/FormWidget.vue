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
    const refNode = ref<HTMLElement | null>(null);

    onMounted(() => {
      draggable(refNode.value, props.type!)
    });

    return {
      refNode,
    };
  },
})
</script>

<style scoped lang="less">
@import "@@/style/component.less";
</style>
