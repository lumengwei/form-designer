<template>
  <a-form-item label="列数">
    <a-input-number v-model:value="props.columnNum"
                    v-on:change="fieldChange('props.columnNum')"
                    :min="1"
    />
  </a-form-item>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import {Form, InputNumber} from 'ant-design-vue'
import {ColumnLayoutProps} from "@@/props";
import Factory from "@@/factory/ColumnLayoutFactory";

function Definition() {
  return {} as ColumnLayoutProps
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
