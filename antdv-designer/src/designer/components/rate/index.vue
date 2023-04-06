<template>
  <a-rate style="width:100%" :count="definition.props.count"/>
</template>
<script lang="ts">
import {Rate} from 'ant-design-vue';
import Factory from '@@/factory/RadioFactory';
import {RateProps} from '@@/props';
import {defineComponent, onMounted, PropType} from "vue";
import {VueComponentProps} from "@/designer/types";
import {ComponentDefinition} from "@@/types";

declare var PropType: () => ComponentDefinition<RateProps>;

export default defineComponent<VueComponentProps<RateProps>>({
  name: Factory.type,
  components: {
    ARate: Rate,
  },
  props: {
    definition: {
      type: PropType,
    },
  }  undefined,
  setup(props: Readonly<VueComponentProps<RateProps>>) {
    onMounted(() => {
      window.console.log(props.definition)
    })
    return {}
  }
})
</script>

<style scoped lang="less">
</style>
