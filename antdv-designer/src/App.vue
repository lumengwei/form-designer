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
@warn-color: #db4040;
@primary-color: #1890ff;
@border-color: #ddd;

.form-design-wrapper {
  min-height: 100%;
}

.form-design {
  background-color: #eff0f1;
}

.widget-list {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: stretch;
  background: white;

  .widget-item {
    width: 150px;
    height: 35px;
    padding: 5px 15px;
    margin: 6px 10px;
    cursor: move;
    background-color: #f5f5f5;
    border: 1px dashed #999;
    border-radius: 2px;
  }
}

.form-view {
  min-height: 93%;
  margin: 0 15px;
  background: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);

  & .form-head {
    position: relative;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    padding: 20px 10px 12px;
    word-wrap: break-word;
    word-break: break-all;
  }

  & .form-content {
    display: flex;
    min-height: 700px;
    padding: 10px;
  }

  & .columnLayout {
    display: table;
    width: 100%;
    table-layout: fixed;
    border: 1px solid @primary-color;
  }

  & .formPlaceholder,
  & .form-placeholder-filed {
    height: 80px;
    border: 2px dashed @warn-color;
  }

  & .ui-sortable {
    width: 100%;
    min-height: 50px;
  }

  & .component {
    position: relative;
    cursor: pointer;

    &.active {
      background: #fff8dc;
      border-color: #ddd;

      & .fm-btn-remove {
        display: block !important;
      }
    }
  }

  & .component-layout {
    position: relative;
    display: flex;
    margin-bottom: -1px;
    border: 1px dashed @border-color;
    cursor: pointer;

    & .component-layout {
      border-right: none;
      border-left: none;
    }

    & .component-layout:first-child {
      border-top: none;
    }
  }

  & .column-layout {
    display: table;
    width: 100%;
    table-layout: fixed;

    & .cell {
      display: table-cell;
      height: 50px;
      vertical-align: top;
      border-left: 1px dashed @border-color;
    }

    & .cell:first-child {
      border-left: none !important;
    }
  }

  & .component-field {
    position: relative;
    background: #fff;
    padding: 8px 10px 8px;
    border: 1px dashed rgba(0, 0, 0, 0);

    & .fm-btn-remove {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      display: none;
      color: #d14836;
      font-size: 14px;
      cursor: pointer;
    }

    & .field-title {
      float: left;
      width: 80px;
      margin-top: 5px;
      text-align: right;
    }

    & .field-content {
      position: relative;
      min-height: 30px;
      margin-left: 90px;
    }
  }

  & .component-field,
  & .component-layout {
    &.active {
      background: #fff8dc;
      border-color: #ddd;
    }
  }
}
</style>
