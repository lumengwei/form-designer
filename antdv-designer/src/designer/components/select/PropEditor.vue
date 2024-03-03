<template>
  <div>
    <OptionsEditor @fieldChange="fieldChange" :props="props" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { SelectProps } from '@@/props';
  import Factory from '@@/factory/SelectFactory';
  import OptionsEditor from '../../widget/OptionsEditor.vue';

  export default defineComponent({
    name: Factory.type,
    components: {
      OptionsEditor,
    },
    props: {
      props: {
        type: Object as PropType<SelectProps>,
        required: true,
      },
    },
    emits: ['fieldChange'],
    setup(_props: any, ctx) {
      function fieldChange(fieldPath: string) {
        ctx.emit('fieldChange', 'props.options');
      }

      return {
        fieldChange,
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
      };
    },
  });
</script>

<style scoped lang="less"></style>
