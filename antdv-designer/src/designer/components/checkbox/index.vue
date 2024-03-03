<template>
  <div>
    <CheckboxGroup :options="definition.props.options">
      <!--      <a-checkbox-->
      <!--          v-for="item in definition.props.options"-->
      <!--          :disabled="item.disabled"-->
      <!--          :value="item.value"-->
      <!--          :key="item.value"-->
      <!--      >-->
      <!--        {{ item.label }}-->
      <!--      </a-checkbox>-->
    </CheckboxGroup>
  </div>
</template>
<script lang="ts">
  import { CheckboxGroup } from 'ant-design-vue';
  import Factory from '@@/factory/CheckboxFactory';
  import { defineComponent, onUpdated, PropType } from 'vue';
  import { ComponentDefinition } from '@@/types';

  export default defineComponent({
    name: Factory.type,
    components: {
      CheckboxGroup,
    },
    props: {
      definition: {
        type: Object as PropType<ComponentDefinition<'Checkbox'>>,
        required: true,
      },
    },
    setup(props: any) {
      let old = props.definition.props.options;
      onUpdated(() => {
        old = props.definition.props.options;
      });
      return {};
    },
  });
</script>

<style scoped lang="less"></style>
