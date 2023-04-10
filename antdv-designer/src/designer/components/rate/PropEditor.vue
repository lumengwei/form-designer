<template>
  <a-form-item label="占位符">
    <a-input-number v-model:value="props.count"
                    v-on:change="fieldChange('props.count')"
                    :min="1"
    />
  </a-form-item>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import {Form, InputNumber} from 'ant-design-vue'
import {RateProps} from "@@/props";
import Factory from "@@/factory/RateFactory";

function Definition() {
  return {} as RateProps
}

export default defineComponent({
  name: Factory.type,
  components: {
    AFormItem: Form.Item,
    AInputNumber: InputNumber
  },
  props: {
    props: Definition
  },
  emits: ['fieldChange'],
  setup(props, ctx) {
    function fieldChange(fieldPath: string) {
      ctx.emit('fieldChange', fieldPath)
    }

    return {
      fieldChange
    }
  }
})
</script>

<style scoped>

</style>
