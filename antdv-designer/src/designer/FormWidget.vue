<template>
  <div title class="widgetItem" draggable="true">
    {{ title }}
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'FormWidget',
    props: {
      type: String,
      title: String,
    },

    setup(props) {
      return {};
    },
  });
</script>

<style scoped lang="less">
  @import '@@/style/component.less';
</style>
