<template>
  <div class="column-layout">
    <CheckboxGroup>
      <a-checkbox
          v-for="item in definition.props.options"
          :disabled="item.disabled"
          :value="item.value"
          :key="item.value"
      >
        {{ item.label }}
      </a-checkbox>
    </CheckboxGroup>
  </div>
</template>
<script lang="ts">
import {Checkbox, CheckboxGroup} from 'ant-design-vue';
import Factory from './Factory';
import {defineComponent, onMounted} from "vue";

export default defineComponent({
  name: Factory.type,
  components: {
    ACheckbox: Checkbox,
    CheckboxGroup,
  },
  props: {
    definition: Object,
  },
  setup(props: any) {
    onMounted(() => {
      window.console.log(props.definition)
    })
    return {}
  }
})
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
