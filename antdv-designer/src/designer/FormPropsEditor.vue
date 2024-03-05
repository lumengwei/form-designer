<template>
  <a-form
    v-if="formModel != null"
    :model="formModel"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    ref="refForm"
  >
    <a-form-item label="标题" name="title" :rules="titleRules">
      <a-input
        placeholder="标题"
        v-model:value="formModel.title"
        @change="onFieldChange('title')"
      />
    </a-form-item>

    <a-form-item label="描述" name="description">
      <a-textarea
        placeholder="描述"
        v-model:value="formModel.description"
        @change="onFieldChange('description')"
      />
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Form, Input, Textarea } from 'ant-design-vue';
  import { getFieldValue, mergeObj2Obj } from '@@/utils';
  import { FormHelper } from './helper';
  import FormStudio from '@@/FormStudio';
  import { FormDefinition } from '@@/types';

  const titleRules = [
    {
      type: 'string',
      max: 50,
      min: 1,
    },
    {
      required: true,
      message: '字段必填',
    },
  ];

  export default defineComponent({
    name: 'FormPropsEditor',
    components: {
      AForm: Form,
      AFormItem: Form.Item,
      AInput: Input,
      ATextarea: Textarea,
    },
    setup() {
      const refForm = ref<any>(null);
      const formModel = ref<FormDefinition>(JSON.parse(JSON.stringify(FormStudio.formDef)));
      const definition = ref<any>(FormStudio.formDef);

      function onFieldChange(fieldPath: string) {
        if (refForm.value) {
          // Fix: form 不支持 `a.b.c` 的格式
          formModel.value = {
            ...formModel.value,
            [fieldPath]: getFieldValue(formModel.value, fieldPath)
          }
          refForm.value.validate([fieldPath]).then(() => {
            mergeObj2Obj(fieldPath, formModel.value, definition.value);
            FormHelper.formView!.$forceUpdate();
          });
        }
      }

      return {
        onFieldChange,
        refForm,
        formModel,
        titleRules,
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      };
    },
  });
</script>

<style scoped lang="less"></style>
