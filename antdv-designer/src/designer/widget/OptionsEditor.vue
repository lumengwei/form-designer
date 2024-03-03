<template>
  <div>
    <div class="optionsTools">
      <a-button size="small" v-on:click="addOption">
        <template #icon>
          <plus-outlined/>
        </template>
        添加
      </a-button>
    </div>
    <table class="options">
      <colgroup>
        <col style="width: 200px;">
        <col style="width: 200px;">
        <col style="width: 50px;">
        <col style="width: 50px;">
        <col style="width: 50px;">
      </colgroup>
      <thead>
      <tr>
        <th>
          显示值
        </th>
        <th>
          真值
        </th>
        <th>
          默认
        </th>
        <th>
          禁用
        </th>
        <th>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(option, index) in props.options">
        <td>
          <a-form-item
              :name="`props.options[${index}].label`"
              :wrapperCol="wrapperCol"
              :labelCol="labelCol"
              style="margin-bottom:0;"
          >
            <a-input v-model:value="props.options[index].label"
                     style="width: 100%"
                     v-on:change="fieldChange(`props.options[${index}].label`)"/>
          </a-form-item>
        </td>
        <td>
          <a-form-item
              :name="`props.options[${index}].value`"
              :wrapperCol="wrapperCol"
              :labelCol="labelCol"
              style="margin-bottom:0;"
          >
            <a-input v-model:value="props.options[index].value"
                     v-on:change="fieldChange(`props.options[${index}].value`)"/>
          </a-form-item>
        </td>
        <td>
          <a-form-item
              :name="`props.options[${index}].checked`"
              :wrapperCol="wrapperCol"
              :labelCol="labelCol"
              style="margin-bottom:0;"
          >
            <a-radio-group name='checkedIndex' v-model:value="props.options[index].checked"
                           v-on:change="fieldChange(`props.options[${index}].checked`)">
              <a-radio :value="true"/>
            </a-radio-group>
          </a-form-item>
        </td>
        <td>

          <a-form-item
              :name="`props.options[${index}].disabled`"
              :wrapperCol="wrapperCol"
              :labelCol="labelCol"
              style="margin-bottom:0;"
          >
            <a-checkbox v-model:checked="props.options[index].disabled"
                        v-on:change="fieldChange(`props.options[${index}].disabled`)"/>
          </a-form-item>
        </td>
        <td>
          <a-button v-if="index !=0" type="text" danger v-on:click="removeOption(index)">
            <template #icon>
              <delete-outlined/>
            </template>
          </a-button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">

import {defineComponent, PropType} from "vue";
import {Button, Checkbox, Form, Input, Radio} from 'ant-design-vue'
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons-vue'
import {OptionType} from "@@/props";

export default defineComponent({
  name: 'OptionsEditor',
  components: {
    AFormItem: Form.Item,
    AInput: Input,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    ACheckbox: Checkbox,
    DeleteOutlined,
    AButton: Button,
    PlusOutlined
  },
  props: {
    props: {
      type: Object as PropType<{ options: OptionType[] }>,
      required: true,
    },
  },
  emits: ['fieldChange'],
  setup(props: any, ctx) {
    function fieldChange() {
      ctx.emit('fieldChange', 'props.options')
    }

    function addOption() {
      const defProps = props.props!;
      const index = defProps.options.length;
      defProps.options.splice(index, 0, {
        label: `显示值${index}`,
        value: `真值${index}`,
        checked: false,
        disabled: false
      });
      ctx.emit('fieldChange', `props.options`)
    }

    function removeOption(index: number) {
      const defProps = props.props!;
      defProps.options.splice(index, 1);
      ctx.emit('fieldChange', `props.options`)
    }

    return {
      fieldChange,
      addOption,
      removeOption,
      labelCol: {span: 0},
      wrapperCol: {span: 24},
    }
  }
})
</script>

<style scoped lang="less">
@import "@@/style/component.less";
</style>
