<template>
  <div class="column-layout">
    <CheckboxGroup v-model:value="value">
      <Checkbox
        v-for="item in definition.props.options"
        :disabled="item.disabled"
        :value="item.value"
        :key="item.value"
      >
        {{ item.label }}
      </Checkbox>
    </CheckboxGroup>
  </div>
</template>
<script lang="ts">
  import { Checkbox, CheckboxGroup } from 'ant-design-vue';
  import Factory from './Factory';

  export default {
    name: Factory.type,
    components: {
      Checkbox,
      CheckboxGroup,
    },
    props: {
      definition: {
        type: Object,
        default() {
          return Factory.createComponentDefinition();
        },
      },
    },
  };
</script>

<style scoped lang="less">
  .column-layout {
    display: table;
    width: 100%;
    table-layout: fixed;

    .cell {
      display: table-cell;
      height: 50px;
      vertical-align: top;
      border-left: 1px dashed #ddd;
    }

    .cel:first-child {
      border-left: none !important;
    }
  }
</style>
