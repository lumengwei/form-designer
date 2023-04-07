<template>
  <div>
    <RadioGroup>
      <a-radio
          v-for="item in definition.props.options"
          :disabled="item.disabled"
          :value="item.value"
          :key="item.value"
      >
        {{ item.label }}
      </a-radio>
    </RadioGroup>
  </div>
</template>
<script lang="ts">
import {Radio, RadioGroup} from 'ant-design-vue';
import Factory from '@@/factory/RadioFactory';
import {defineComponent} from "vue";
import {RadioProps} from "@@/props";
import {ComponentDefinition} from "@@/types";

function Definition() {
  return {} as ComponentDefinition<RadioProps>
}

export default defineComponent({
  name: Factory.type,
  components: {
    ARadio: Radio,
    RadioGroup,
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
