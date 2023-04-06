<template>
  <div>
    <RadioGroup>
      <a-radio
          v-for="item in definition.props.options"
          :disabled="item.disabled"
          :value="item.value"
          :key="item.value"
      >
        {{ item.label }}
      </a-radio>
    </RadioGroup>
  </div>
</template>
<script lang="ts">
import {Radio, RadioGroup} from 'ant-design-vue';
import Factory from '@@/factory/RadioFactory';
import {defineComponent, onMounted} from "vue";

export default defineComponent({
  name: Factory.type,
  components: {
    ARadio: Radio,
    RadioGroup,
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
