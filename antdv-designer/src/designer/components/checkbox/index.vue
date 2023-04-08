<template>
  <div>
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
import Factory from '@@/factory/CheckboxFactory';
import {defineComponent} from "vue";
import {CheckboxProps} from "@@/props";
import {ComponentDefinition} from "@@/types";

function Definition() {
  return {} as ComponentDefinition<CheckboxProps>
}

export default defineComponent({
  name: Factory.type,
  components: {
    ACheckbox: Checkbox,
    CheckboxGroup,
  },
  props: {
    definition: Definition,
  },
  setup(props: any) {
    return {}
  }
})
</script>

<style scoped lang="less">
</style>
