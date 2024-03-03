<template>
  <a-input style="width: 100%" :placeholder="definition.props.placeholder" />
</template>
<script lang="ts">
  import { Input } from 'ant-design-vue';
  import Factory from '@@/factory/InputFactory';
  import { defineComponent, onUpdated, PropType } from 'vue';
  import { ComponentDefinition } from '@@/types';

  export default defineComponent({
    name: Factory.type,
    components: {
      AInput: Input,
    },
    props: {
      definition: {
        type: Object as PropType<ComponentDefinition<'Input'>>,
        required: true,
      },
    },
    setup(_props: any) {
      return {};
    },
  });
</script>

<style scoped lang="less"></style>
