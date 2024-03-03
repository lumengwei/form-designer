<template>
  <div class="widgetList" ref="refNode">
    <form-widget v-for="comp in compList" :key="comp.type" :type="comp.type" :title="comp.title" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { draggable } from './lib/sortable';
  import FormWidget from './FormWidget.vue';
  import FormStudio from '@@/FormStudio';
  export default defineComponent({
    name: 'FormWidgetList',
    components: { FormWidget },
    props: {
      groupType: {
        type: String,
        required: true,
      },
    },

    setup(props) {
      const refNode = ref<HTMLElement | null>(null);
      const componentList = FormStudio.factoryList;
      const compList = componentList.filter((it) => it.group == props.groupType);

      onMounted(() => {
        draggable(refNode.value, compList);
      });

      return {
        refNode,
        compList,
      };
    },
  });
</script>

<style scoped lang="less">
  @import '@@/style/component.less';
</style>
