<template>
  <layout-wrapper>
    <div class="column-layout">
      <template v-if="definition.children">
        <template v-for="it in definition.children" :key="it.type">
          <div class="cell">
            <Component :is="getComponent(it.type)" />
          </div>
        </template>
      </template>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
  import Factory from './Factory';
  import LayoutWrapper from '../../wrapper/LayoutWrapper.vue';
  import { getComponent } from '/@/modules/form/views/designer/ComponentDef';

  export default {
    name: Factory.type,
    components: {
      LayoutWrapper,
    },
    props: {
      definition: {
        type: Object,
        default() {
          return Factory.createComponentDefinition();
        },
      },
    },
    setup() {
      return {
        getComponent,
      };
    },
  };
</script>

<style scoped lang="less">
  .column-layout {
    display: table;
    width: 100%;
    table-layout: fixed;

    .cell {
      display: table-cell;
      height: 50px;
      vertical-align: top;
      border-left: 1px dashed #ddd;
    }

    .cel:first-child {
      border-left: none !important;
    }
  }
</style>
