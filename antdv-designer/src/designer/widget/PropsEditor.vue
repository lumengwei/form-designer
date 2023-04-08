<template>
  <div>
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="字段">
        <Input placeholder="字段"/>
      </a-form-item>
      <div>
        <a-form-item
            label="类型"
            name="fieldDef.fieldType"
        >
          <Select :options="fieldTypeList" v-on:change="onSelectType"/>
        </a-form-item>
        <a-form-item
            label="长度或精度"
            name="fieldDef.length"
        >
          <InputNumber placeholder="长度或精度" :disabled="lengthDisabled"/>
        </a-form-item>
        <a-form-item
            label="小数"
            name="fieldDef.scale"
        >
          <InputNumber placeholder="小数" :disabled="scaleDisabled"/>
        </a-form-item>
      </div>
      <slot/>
    </a-form>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {Form, Input, InputNumber, Select} from 'ant-design-vue'
import {ComponentDefinition, FieldType, FieldTypes} from "@@/types";

function Definition() {
  return {} as ComponentDefinition<any>
}

const lengthFields: FieldType[] = ['varchar', 'string'];
const scaleFields: FieldType[] = ['decimal'];
const writeFields: string[] = ["props", "title", "fieldDef.fieldName", "fieldDef.fieldType"];

const fieldTypeList: { value: string, label: string }[] = Object.keys(FieldTypes).map(field => {
  return {
    value: field,
    label: FieldTypes[field]
  }
})
export default defineComponent({
  name: "PropsEditor",
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    Input,
    InputNumber,
    Select
  },
  props: {
    definition: Definition
  },
  setup() {

    const scaleDisabled = ref(false);
    const lengthDisabled = ref(false);

    function onSelectType(val: string) {
      scaleDisabled.value = scaleFields.indexOf(val as FieldType) < 0;
      lengthDisabled.value = lengthFields.indexOf(val as FieldType) < 0
    }

    return {
      fieldTypeList,
      onSelectType,
      scaleDisabled,
      lengthDisabled,
      labelCol: {span: 4},
      wrapperCol: {span: 14},
    }
  }
})
</script>

<style scoped>

</style>
