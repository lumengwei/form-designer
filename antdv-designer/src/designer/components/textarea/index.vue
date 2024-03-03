<template>
  <a-textarea style="width: 100%" :placeholder="definition.props.placeholder" />
</template>
<script lang="ts">
  import { Textarea } from 'ant-design-vue';
  import Factory from '@@/factory/TextAreaFactory';
  import { defineComponent, PropType } from 'vue';
  import { ComponentDefinition } from '@@/types';

  export default defineComponent({
    name: Factory.type,
    components: {
      ATextarea: Textarea,
    },
    props: {
      definition: Object as PropType<ComponentDefinition<'TextArea'>>,
    },
    setup() {
      return {};
    },
  });
</script>

<style scoped lang="less"></style>
