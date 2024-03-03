<template>
  <a-select
    style="width: 100%"
    :placeholder="definition.props.placeholder"
    :options="definition.props.options"
  >
    <!--    <a-select-option-->
    <!--        v-for="item in definition.props.options"-->
    <!--        :disabled="item.disabled"-->
    <!--        :value="item.value"-->
    <!--        :key="item.value"-->
    <!--    >-->
    <!--      {{ item.label }}-->
    <!--    </a-select-option>-->
  </a-select>
</template>
<script lang="ts">
  import { Select } from 'ant-design-vue';
  import Factory from '@@/factory/SelectFactory';
  import { defineComponent, PropType } from 'vue';
  import { ComponentDefinition } from '@@/types';

  export default defineComponent({
    name: Factory.type,
    components: {
      ASelect: Select,
      ASelectOption: Select.Option,
    },
    props: {
      definition: {
        type: Object as PropType<ComponentDefinition<'Select'>>,
      },
    },
    setup(_props: any) {
      return {};
    },
  });
</script>

<style scoped lang="less"></style>
