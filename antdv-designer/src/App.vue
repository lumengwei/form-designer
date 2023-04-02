<template>
  <Layout class="form-design-wrapper">
    <LayoutHeader theme="light"> 操作</LayoutHeader>
    <Layout class="form-design">
      <LayoutSider width="360" theme="light">
        <div class="widget-list">
          <FormWidget v-for="comp in componentList" :key="comp.type" :component-factory="comp"/>
        </div>
      </LayoutSider>
      <LayoutContent>
        <div>
          <div class="scroll-wrapper">
            <div class="form-view">
              <div class="form-head">
                <p class="form-name"></p>
                <div class="form-description">表单描述</div>
              </div>
              <div class="form-content">
                <LinearLayout :toolbar-able="false"/>
              </div>
            </div>
          </div>
        </div>
      </LayoutContent>
      <LayoutSider width="360" theme="light"> right sidebar</LayoutSider>
    </Layout>
  </Layout>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import {Layout, LayoutContent, LayoutHeader, LayoutSider} from 'ant-design-vue';
import installModule from './installModule';
import FormStudio from "../../src/FormStudio";
import FormWidget from "./FormWidget.vue"
import LinearLayout from "./layout/linear/index.vue"

installModule(['components', 'layout']);

export default defineComponent({
  name: 'FormDesigner',
  components: {
    FormWidget,
    LinearLayout,
    LayoutContent,
    LayoutSider,
    Layout,
    LayoutHeader,
  },
  emits: ['success', 'register'],
  setup() {
    const componentList = FormStudio.factoryFilter((it) => true);
    return {
      componentList,
    };
  },
});
</script>
<style lang="less">
@import "@@/style/formView.less";
</style>
