<template>
  <a-input style="width:100%" :placeholder="definition.props.placeholder"/>
</template>
<script lang="ts">
import {Input} from 'ant-design-vue';
import Factory from '@@/factory/InputFactory';
import {defineComponent, onUpdated} from "vue";
import {InputProps} from "@@/props";
import {ComponentDefinition} from "@@/types";


function Definition() {
  return {} as ComponentDefinition<InputProps>
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
