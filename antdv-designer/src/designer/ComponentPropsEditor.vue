<template>
  <div v-if="formModel != null">
    <a-form
        :model="formModel"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        ref="refForm"
    >
      <a-form-item label="字段"
                   name="fieldDef.fieldName"
                   v-if="formModel.fieldDef != null"
                   :rules="fieldNameRules"
      >
        <Input placeholder="字段"
               v-model:value="formModel.fieldDef.fieldName"
               v-on:change="onFieldChange('fieldDef.fieldName')"
        />
      </a-form-item>
      <a-form-item
          label="类型"
          name="fieldDef.fieldType"
          v-if="formModel.fieldDef != null"
      >
        <Select :options="fieldTypeList"
                v-on:change="onSelectType"
                v-model:value="formModel.fieldDef.fieldType"
        />
      </a-form-item>
      <a-form-item
          label="长度或精度"
          name="fieldDef.length"
          v-if="formModel.fieldDef != null"
      >
        <InputNumber placeholder="长度或精度"
                     :disabled="lengthDisabled"
                     v-model:value="formModel.fieldDef.length"
                     v-on:change="onFieldChange('fieldDef.length')"
        />
      </a-form-item>
      <a-form-item
          label="小数"
          name="fieldDef.scale"
          v-if="formModel.fieldDef != null"
      >
        <InputNumber
            placeholder="小数"
            :disabled="scaleDisabled"
            v-model:value="formModel.fieldDef.scale"
            v-on:change="onFieldChange('fieldDef.scale')"
        />
      </a-form-item>
      <a-form-item
          label="标题"
          name="title"
          :rules="titleRules"
          v-if="formModel.fieldDef != null"
      >
        <Input placeholder="标题"
               v-model:value="formModel.title"
               v-on:change="onFieldChange('title')"
        />
      </a-form-item>
      <PropsEditorRender :type="formModel.type" :props="formModel.props" v-on:field-change="onFieldChange"/>
    </a-form>
  </div>
</template>

<script lang="ts">
import {defineComponent, getCurrentInstance, onMounted, ref} from "vue";
import PropsEditorRender from "@/designer/wrapper/PropsEditorRender.vue";
import {FormHelper} from "@/designer/helper";
import {getFieldValue, mergeObj2Obj} from "@@/utils";
import {FieldType, FieldTypes} from "@@/types";
import {InputNumber, Input, Select, Form} from 'ant-design-vue'

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
    message: '字段必填'
  }
]

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
  name: "ComponentPropsEditor",
  components: {PropsEditorRender, InputNumber, Input, Select, AForm: Form, AFormItem: Form.Item},
  setup() {
    const refForm = ref<any>(null);
    const definition = ref<any>(null);
    const formModel = ref<any>(null);
    const scaleDisabled = ref(false);
    const lengthDisabled = ref(false);

    onMounted(() => {
      const inst = getCurrentInstance();
      FormHelper.formEditorIns = inst?.proxy;
    })


    function onFieldChange(fieldPath: string) {
      if (refForm.value) {
        // Fix: form 不支持 `a.b.c` 的格式
        formModel.value[fieldPath] = getFieldValue(formModel.value, fieldPath)
        refForm.value.validate([fieldPath]).then(res => {
          window.console.log(res)
          mergeObj2Obj(fieldPath, formModel.value, definition.value)
          FormHelper.activeComponentIns!.$forceUpdate()
        })
      }
    }

    function setDefinition(def) {
      definition.value = def;
      formModel.value = def && JSON.parse(JSON.stringify(def))
    }

    function onSelectType(val: string) {
      scaleDisabled.value = scaleFields.indexOf(val as FieldType) < 0;
      lengthDisabled.value = lengthFields.indexOf(val as FieldType) < 0;
      onFieldChange('fieldDef.fieldType')
    }

    return {
      fieldTypeList,
      definition,
      formModel,
      setDefinition,
      onFieldChange,
      onSelectType,
      scaleDisabled,
      lengthDisabled,
      fieldNameRules,
      titleRules,
      labelCol: {span: 4},
      wrapperCol: {span: 20},
      refForm
    }
  }
})
</script>

<style scoped>

</style>
