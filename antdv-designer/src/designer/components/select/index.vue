<template>
  <a-select style="width:100%">
    <a-select-option
        v-for="item in definition.props.options"
        :disabled="item.disabled"
        :value="item.value"
        :key="item.value"
    >
      {{ item.label }}
    </a-select-option>
  </a-select>
</template>
<script lang="ts">
import {Select} from 'ant-design-vue';
import Factory from '@@/factory/SelectFactory';
import {defineComponent, onMounted} from "vue";

export default defineComponent({
  name: Factory.type,
  components: {
    ASelect: Select,
    ASelectOption: Select.Option,
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
