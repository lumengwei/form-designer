<template>
  <a-form-item label="占位符">
    <a-input v-model:value="props.placeholder"/>
  </a-form-item>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import {Form, Input} from 'ant-design-vue'
import {InputProps} from "@@/props";
import Factory from "@@/factory/InputFactory";

function Definition() {
  return {} as InputProps
}

export default defineComponent({
  name: Factory.type,
  components: {
    AFormItem: Form.Item,
    AInput: Input
  },
  props: {
    props: Definition
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>

</style>
