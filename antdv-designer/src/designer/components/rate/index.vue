<template>
  <a-rate style="width: 100%" :count="definition.props.count" />
</template>
<script lang="ts">
  import { Rate } from 'ant-design-vue';
  import Factory from '@@/factory/RateFactory';
  import { RateProps } from '@@/props';
  import { defineComponent, PropType } from 'vue';
  import { ComponentDefinition } from '@@/types';

  export default defineComponent({
    name: Factory.type,
    components: {
      ARate: Rate,
    },
    props: {
      definition: {
        type: Object as PropType<ComponentDefinition<'Rate'>>,
      },
    },
    setup() {
      return {};
    },
  });
</script>

<style scoped lang="less"></style>
