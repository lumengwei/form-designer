<template>
  <div>
    <RadioGroup :options="definition.props.options">
      <!--      <a-radio-->
      <!--          v-for="item in definition.props.options"-->
      <!--          :disabled="item.disabled"-->
      <!--          :value="item.value"-->
      <!--          :key="item.value"-->
      <!--      >-->
      <!--        {{ item.label }}-->
      <!--      </a-radio>-->
    </RadioGroup>
  </div>
</template>
<script lang="ts">
  import { Radio, RadioGroup } from 'ant-design-vue';
  import Factory from '@@/factory/RadioFactory';
  import { defineComponent, PropType } from 'vue';
  import { ComponentDefinition } from '@@/types';

  export default defineComponent({
    name: Factory.type,
    components: {
      ARadio: Radio,
      RadioGroup,
    },
    props: {
      definition: {
        type: Object as PropType<ComponentDefinition<'Radio'>>,
        required: true,
      },
    },
    setup(props: any) {
      return {};
    },
  });
</script>

<style scoped lang="less"></style>
