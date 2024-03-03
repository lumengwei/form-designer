<template>
  <a-form-item label="数量">
    <a-input-number v-model:value="props.count" @change="fieldChange('props.count')" :min="1" />
  </a-form-item>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Form, InputNumber } from 'ant-design-vue';
  import { RateProps } from '@@/props';
  import Factory from '@@/factory/RateFactory';

  export default defineComponent({
    name: Factory.type,
    components: {
      AFormItem: Form.Item,
      AInputNumber: InputNumber,
    },
    props: {
      props: {
        type: Object as PropType<RateProps>,
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
