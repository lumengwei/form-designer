<template>
  <div class="column-layout">
    <Cell
        v-if="definition.children"
        v-for="index in definition.props.columnNum"
        :key="index"
        :definition="getChildBySlot(index)"
        v-on:on-delete="removeChildBySlot(index)"
        :slot-index="index"
    />
  </div>
</template>

<script lang="ts">
import Factory from '@@/factory/ColumnLayoutFactory';
import ComponentRender from '../../wrapper/ComponentRender.vue';
import {useVueComponentGroup} from "@/designer/helper";
import {defineComponent} from "vue";
import {ComponentDefinition} from "@@/types";
import Cell from "@/designer/layout/column/Cell.vue";
import {ColumnLayoutProps} from "@@/props";


function Definition() {
  return {} as ComponentDefinition<ColumnLayoutProps>
}

export default defineComponent({
  name: Factory.type,
  components: {
    Cell,
    ComponentRender
  },
  props: {
    definition: {
      type: Definition,
      default() {
        return Factory.createComponentDefinition();
      },
    },
  },
  setup() {

    const groupMethods = useVueComponentGroup();


    return {
      ...groupMethods,
    };
  },
})
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
