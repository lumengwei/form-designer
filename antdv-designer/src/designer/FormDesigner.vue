<template>
  <div class="form-designer">
    <div class="form-widget">
      <Tabs v-model:activeKey="activeKey">
        <tab-pane tab="表单组件" key="1">
          <form-widget-list :group-type="groupTypeCp" />
        </tab-pane>
        <tab-pane tab="布局" key="2">
          <form-widget-list :group-type="groupTypeLayout" />
        </tab-pane>
      </Tabs>
    </div>
    <div class="form-view-wrapper">
      <form-view :formDefinition="fromDef" :definition="definition" :show-header="false" />
    </div>
    <div class="form-editor">
      <Tabs v-model:activeKey="activeKeyRight">
        <tab-pane tab="控件属性" key="1">
          <ComponentPropsEditor />
        </tab-pane>
        <tab-pane tab="表单属性" key="2">
          <FormPropsEditor />
        </tab-pane>
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts">
  import { Tabs } from 'ant-design-vue';
  import { defineComponent, ref, PropType } from 'vue';
  import FormView from './FormView.vue';
  import {
    ComponentDefinition,
    FactoryGroup,
    FormDefinition,
  } from '@@/types';
  import FormWidgetList from './FormWidgetList.vue';
  import ComponentPropsEditor from './ComponentPropsEditor.vue';
  import FormPropsEditor from './FormPropsEditor.vue';

  export default defineComponent({
    name: 'FormDesigner',
    components: {
      FormPropsEditor,
      ComponentPropsEditor,
      Tabs,
      FormView,
      TabPane: Tabs.TabPane,
      FormWidgetList,
    },
    props: {
      definition: {
        type: Object as PropType<ComponentDefinition<any>>,
        required: true,
      },
      fromDef: {
        type: Object as PropType<FormDefinition>,
        required: true,
      },
    },
    setup() {
      return {
        groupTypeLayout: FactoryGroup.Layout,
        groupTypeCp: FactoryGroup.Component,
        activeKey: ref('1'),
        activeKeyRight: ref('1'),
      };
    },
    computed: {},
  });
</script>

<style lang="less">
  @import '@@/style/formView.less';
  @import '@@/style/component.less';
</style>
