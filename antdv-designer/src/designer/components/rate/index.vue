<template>
  <a-rate style="width:100%" :count="definition.props.count"/>
</template>
<script lang="ts">
import {Rate} from 'ant-design-vue';
import Factory from '@@/factory/RadioFactory';
import {RateProps} from '@@/props';
import {defineComponent} from "vue";
import {ComponentDefinition} from "@@/types";


function Definition() {
  return {} as ComponentDefinition<RateProps>
}

export default defineComponent({
  name: Factory.type,
  components: {
    ARate: Rate,
  },
  props: {
    definition: {
      type: Definition
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
</style>
