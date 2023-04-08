<template>
  <div class="form-designer">
    <div class="form-widget">
      <Tabs v-model:activeKey="activeKey">
        <tab-pane tab="表单组件" key='1'>
          <div class="widgetList">
            <form-widget v-for="comp in compList" :key="comp.type" :type="comp.type" :title="comp.title"/>
          </div>
        </tab-pane>
        <tab-pane tab="布局" key='2'>
          <div class="widgetList">
            <form-widget v-for="comp in layoutList" :key="comp.type" :type="comp.type" :title="comp.title"/>
          </div>
        </tab-pane>
      </Tabs>
    </div>
    <div class="form-view-wrapper">
      <form-view :formDefinition="fromDef" :definition="definition"></form-view>
    </div>
    <div class="form-editor">
      <Tabs v-model:activeKey="activeKeyRight">
        <tab-pane tab="控件属性" key='1'>
          <ComponentPropsEditor/>
        </tab-pane>
        <tab-pane tab="表单属性" key='2'>
          <!--          <FormPropsEditor definition={FormStudio.fromDef}/>-->
        </tab-pane>
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts">
import {Tabs} from 'ant-design-vue';
import {computed, defineComponent, ref} from "vue";
import FormView from './FormView.vue'
import FormStudio from "@@/FormStudio";
import {FactoryGroup} from "@@/types";
import FormWidget from "@/designer/FormWidget.vue";
import ComponentPropsEditor from "@/designer/ComponentPropsEditor.vue";

export default defineComponent({
  name: "FormDesigner",
  components: {
    ComponentPropsEditor,
    FormWidget,
    Tabs,
    FormView,
    TabPane: Tabs.TabPane
  },
  setup() {
    const componentList = FormStudio.factoryFilter((it) => true);

    const layoutList = computed(() => {
      return componentList.filter(it => it.group == FactoryGroup.Layout)
    })

    const compList = computed(() => {
      return componentList.filter(it => it.group == FactoryGroup.Component)
    })

    return {
      layoutList,
      compList,
      fromDef: FormStudio.fromDef,
      definition: FormStudio.definition,
      activeKey: ref('1'),
      activeKeyRight: ref('1')
    }
  }
})
</script>

<style lang="less">
@import "@@/style/formView.less";
@import "@@/style/component.less";
</style>
