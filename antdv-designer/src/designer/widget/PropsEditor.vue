<template>
  <div v-if="definition">
    <a-form
        v-model="definition"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
      <a-form-item label="字段"
                   name="fieldDef.fieldName"
                   :rules="fieldNameRules"
      >
        <Input placeholder="字段"
               v-model:value="definition.fieldDef.fieldName"
               v-on:change="fieldChange('fieldDef.fieldName')"
        />
      </a-form-item>
      <div>
        <a-form-item
            label="类型"
            name="fieldDef.fieldType"
        >
          <Select :options="fieldTypeList"
                  v-on:change="onSelectType"
                  v-model:value="definition.fieldDef.fieldType"
          />
        </a-form-item>
        <a-form-item
            label="长度或精度"
            name="fieldDef.length"
        >
          <InputNumber placeholder="长度或精度"
                       :disabled="lengthDisabled"
                       v-model:value="definition.fieldDef.length"
                       v-on:change="fieldChange('fieldDef.length')"
          />
        </a-form-item>
        <a-form-item
            label="小数"
            name="fieldDef.scale"
        >
          <InputNumber
              placeholder="小数"
              :disabled="scaleDisabled"
              v-model:value="definition.fieldDef.scale"
              v-on:change="fieldChange('fieldDef.scale')"
          />
        </a-form-item>
        <a-form-item
            label="标题"
            name="title"
            :rules="titleRules"
        >
          <Input placeholder="标题"
                 v-model:value="definition.title"
                 v-on:change="fieldChange('title')"
          />
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
  emits: ['fieldChange'],
  setup(props, ctx) {
    const scaleDisabled = ref(false);
    const lengthDisabled = ref(false);

    function onSelectType(val: string) {
      scaleDisabled.value = scaleFields.indexOf(val as FieldType) < 0;
      lengthDisabled.value = lengthFields.indexOf(val as FieldType) < 0;
      fieldChange('fieldDef.fieldType')
    }

    function fieldChange(fieldPath: string) {
      ctx.emit('fieldChange', fieldPath)
    }

    const fieldNameRules = [
      {
        type: 'string',
        max: 50,
        min: 1,
        message: '长度1~50'
      }, {
        required: true,
        message: '字段必填'
      }, {
        type: 'string',
        pattern: new RegExp("[a-zA-Z]*"),
        message: '只能输入字母'
      }
    ]

    const titleRules = [
      {
        type: 'string',
        max: 50,
        min: 1,
      }, {
        required: true,
      }
    ]

    return {
      fieldTypeList,
      onSelectType,
      scaleDisabled,
      lengthDisabled,
      labelCol: {span: 4},
      wrapperCol: {span: 14},
      fieldNameRules,
      titleRules,
      fieldChange
    }
  }
})
</script>

<style scoped>

</style>
