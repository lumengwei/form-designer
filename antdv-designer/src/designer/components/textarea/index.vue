<template>
  <a-textarea style="width:100%" :placeholder="definition.props.placeholder"/>
</template>
<script lang="ts">
import {Textarea} from 'ant-design-vue';
import Factory from '@@/factory/TextAreaFactory';
import {defineComponent} from "vue";
import {TextAreaProps} from "@@/props";
import {ComponentDefinition} from "@@/types";


function Definition() {
  return {} as ComponentDefinition<TextAreaProps>
}


export default defineComponent({
  name: Factory.type,
  components: {
    ATextarea: Textarea,
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
