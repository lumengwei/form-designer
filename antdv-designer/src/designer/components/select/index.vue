<template>
  <a-select style="width:100%" :placeholder="definition.props.placeholder">
    <a-select-option
        v-for="item in definition.props.options"
        :disabled="item.disabled"
        :value="item.value"
        :key="item.value"
    >
      {{ item.label }}
    </a-select-option>
  </a-select>
</template>
<script lang="ts">
import {Select} from 'ant-design-vue';
import Factory from '@@/factory/SelectFactory';
import {defineComponent} from "vue";
import {SelectProps} from "@@/props";
import {ComponentDefinition} from "@@/types";


function Definition() {
  return {} as ComponentDefinition<SelectProps>
}

export default defineComponent({
  name: Factory.type,
  components: {
    ASelect: Select,
    ASelectOption: Select.Option,
  },
  props: {
    definition: {
      type: Definition,
    },
  },
  setup(props: any) {
    return {}
  }
})
</script>

<style scoped lang="less">
</style>
