<template>
  <div>
    <OptionsEditor @fieldChange="fieldChange" :props="props" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { CheckboxProps } from '@@/props';
  import Factory from '@@/factory/CheckboxFactory';
  import OptionsEditor from '../../widget/OptionsEditor.vue';

  export default defineComponent({
    name: Factory.type,
    components: {
      OptionsEditor,
    },
    props: {
      props: {
        type: Object as PropType<CheckboxProps>,
        required: true,
      },
    },
    emits: ['fieldChange'],
    setup(_props, ctx) {
      return {
        fieldChange() {
          ctx.emit('fieldChange', 'props.options');
        },
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
      };
    },
  });
</script>

<style scoped lang="less"></style>
