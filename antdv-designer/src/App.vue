<template>
  <Layout>
    <LayoutHeader theme="light" class="layout-header">
      <Button type="primary" v-on:click="getJsonData">获取数据</Button>
    </LayoutHeader>
    <div class="layout-content">
      <form-designer/>
    </div>
  </Layout>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import {Button, Layout, LayoutHeader} from 'ant-design-vue';
import installModule from './designer/installModule';
import FormDesigner from "@/designer/FormDesigner.vue";
import FormStudio from "@@/FormStudio";

installModule();

export default defineComponent({
  name: 'App',
  components: {
    FormDesigner,
    Layout,
    LayoutHeader,
    Button
  },
  setup() {
    function getJsonData() {
      alert(JSON.stringify(FormStudio.getJsonData()));
    }

    return {
      getJsonData
    };
  },
});
</script>
<style lang="less" scoped>
.layout-header {
  background: white;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #efefef
}

.layout-content {
  height: calc(100vh - 60px);
}
</style>
