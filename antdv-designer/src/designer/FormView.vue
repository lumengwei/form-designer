<template>
  <div class="form-view" :style="{width: formDefinition.width || '778px'}">
    <div class="form-head">
      <div class="form-name">{{ formDefinition.title }}</div>
      <div class="form-description">{{ formDefinition.description }}</div>
    </div>
    <div class="form-content">
      <LayoutWrapper :toolbarAble="false">
        <Component :is="getComponent(definition.type)" :definition="definition"/>
      </LayoutWrapper>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {FormHelper} from "@/designer/helper";
import LayoutWrapper from "@/designer/wrapper/LayoutWrapper.vue";
import {ComponentDefinition, FormDefinition} from "@@/types";

function FormDefinition() {
  return {} as FormDefinition
}

function Definition() {
  return {} as ComponentDefinition<any>;
}

export default defineComponent({
  name: "FormView",
  components: {LayoutWrapper},
  props: {
    formDefinition: FormDefinition,
    definition: Definition
  },
  setup() {
    function getComponent(type: string) {
      return FormHelper.getComponent(type)
    }

    return {
      getComponent,
    }
  }
})
</script>

<style scoped>

</style>
