<template>
  <div
      title
      class="widget-item"
      draggable="true"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
      ref="refNode"
  >
    {{ componentFactory.title }}
  </div>
</template>

<script lang="ts">
import {onMounted, ref} from 'vue';
import FormStudio from "../../src/FormStudio";
import {ComponentFactory} from "../../src/types";

export default {
  name: 'FormWidget',
  props: {
    componentFactory: Object,
  },

  setup(props) {
    const refNode = ref(null);

    function onMouseDown() {
    }

    function onMouseUp() {
    }

    onMounted(() => {
      $(refNode.value).draggable({
        connectToSortable: '.ui-sortable',
        helper: 'clone',
        opacity: 0.8,
        appendTo: 'body',
        start() {
          FormStudio.draggedFactory = props.componentFactory as ComponentFactory<any>;
        },
        stop() {
          FormStudio.draggedFactory = null;
        },
      });
    });
    return {
      onMouseDown,
      onMouseUp,
      refNode,
    };
  },
};
</script>

<style scoped lang="less">
.widget-item {
  width: 150px;
  height: 35px;
  padding: 5px 15px;
  margin: 6px 10px;
  cursor: move;
  background-color: #f5f5f5;
  border: 1px dashed #999;
  border-radius: 2px;
}
</style>
