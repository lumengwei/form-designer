<template>
  <div>
    <OptionsEditor v-on:fieldChange="fieldChange" :props="props"/>
  </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import {CheckboxProps} from "@@/props";
import Factory from "@@/factory/CheckboxFactory";
import OptionsEditor from "@/designer/widget/OptionsEditor.vue";

function Definition() {
  return {} as CheckboxProps
}

export default defineComponent({
  name: Factory.type,
  components: {
    OptionsEditor,
  },
  props: {
    props: Definition
  },
  emits: ['fieldChange'],
  setup(props: any, ctx) {
    function fieldChange(fieldPath: string) {
      ctx.emit('fieldChange', 'props.options')
    }

    return {
      fieldChange,
      labelCol: {span: 0},
      wrapperCol: {span: 24},
    }
  }
})
</script>

<style scoped lang="less">
@import "@@/style/component.less";
</style>
