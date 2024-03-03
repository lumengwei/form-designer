<template>
  <a-form-item label="占位符">
    <a-input v-model:value="props!.placeholder" @change="fieldChange('props.placeholder')" />
  </a-form-item>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Form, Input } from 'ant-design-vue';
  import { TextAreaProps } from '@@/props';
  import Factory from '@@/factory/TextAreaFactory';

  export default defineComponent({
    name: Factory.type,
    components: {
      AFormItem: Form.Item,
      AInput: Input,
    },
    props: {
      props: {
        type: Object as PropType<TextAreaProps>,
        required: true,
      },
    },
    emits: ['fieldChange'],
    setup(_props, ctx) {
      function fieldChange(fieldPath: string) {
        ctx.emit('fieldChange', fieldPath);
      }

      return {
        fieldChange,
      };
    },
  });
</script>

<style scoped></style>
