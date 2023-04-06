<template>
  <a-input style="width:100%"/>
</template>
<script lang="ts">
import {Input} from 'ant-design-vue';
import Factory from '@@/factory/InputFactory';
import {defineComponent, onMounted} from "vue";

export default defineComponent({
  name: Factory.type,
  components: {
    AInput: Input,
  },
  props: {
    definition: Object,
  },
  setup(props: any) {
    onMounted(() => {
      window.console.log(props.definition)
    })
    return {}
  }
})
</script>

<style scoped lang="less">
</style>
