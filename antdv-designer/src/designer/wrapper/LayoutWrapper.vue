<template>
  <div
      class="component-layout component"
      :class="{
      active: active,
    }"
      @click="onActive"
  >
    <slot/>
    <div class="layout-tool-bar" v-if="toolbarAble">
      <span class="fm-btn" title="拖动">
        <drag-outlined/>
      </span>
      <span class="fm-btn fm-btn-del" title="删除" v-on:click="onDelete">
        <delete-outlined/>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {DeleteOutlined, DragOutlined} from '@ant-design/icons-vue';

export default {
  name: 'LayoutWrapper',
  components: {
    DragOutlined,
    DeleteOutlined,
  },
  emits: ['onActive', 'onDelete'],
  props: {
    toolbarAble: {
      type: Boolean,
      default() {
        return true;
      },
    },
    active: {
      type: Boolean,
      default() {
        return false;
      },
    }
  },
  setup(props: any, ctx: any) {

    function onActive(e: Event) {
      e.stopPropagation();
      ctx.emit('onActive')
    }

    function onDelete(e: Event) {
      e.stopPropagation();
      ctx.emit('onDelete')
    }

    return {
      onActive,
      onDelete
    };
  },
};
</script>

<style scoped lang="less">
@warn-color: #db4040;
@primary-color: #1890ff;
@border-color: #ddd;
.component-layout {
  display: table;
  width: 100%;
  table-layout: fixed;

  .layout-tool-bar {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 100;
    line-height: 20px;
    -webkit-transition: opacity linear 0.15s;
    -moz-transition: opacity linear 0.15s;
    transition: opacity linear 0.15s;

    & .fm-btn {
      padding: 0 5px;
      margin-left: 1px;
      font-size: 12px;
      color: #fff;
      text-align: center;
      cursor: pointer;
      background: @primary-color;
    }

    .fm-btn-del {
      cursor: pointer;
      background: @warn-color !important;
    }
  }
}
</style>
