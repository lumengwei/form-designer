<template>
  <a-input style="width:100%"/>
</template>
<script lang="ts">
import {Input} from 'ant-design-vue';
import Factory from '@@/factory/InputFactory';
import {defineComponent} from "vue";
import {RateProps} from "@@/props";
import {ComponentDefinition} from "@@/types";


function Definition() {
  return {} as ComponentDefinition<RateProps>
}


export default defineComponent({
  name: Factory.type,
  components: {
    AInput: Input,
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
