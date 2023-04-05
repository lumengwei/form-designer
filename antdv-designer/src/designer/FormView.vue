<template>
  <div class="form-view" :style="{width: formDefinition.width || '778px'}">
    <div class="form-head">
      <div class="form-name">{{ formDefinition.title }}</div>
      <div class="form-description">{{ formDefinition.description }}</div>
    </div>
    <div class="form-content">
      <LayoutWrapper :toolbarAble="false">
        <Component :is="getComponent(definition.type)"/>
      </LayoutWrapper>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {FormHelper} from "@/designer/helper";
import FormStudio from "@@/FormStudio";
import LayoutWrapper from "@/designer/wrapper/LayoutWrapper.vue";

export default defineComponent({
  name: "FormView",
  components: {LayoutWrapper},
  props: {
    formDefinition: Object,
  },
  setup() {
    function getComponent(type: string) {
      return FormHelper.getComponent(type)
    }

    return {
      getComponent,
      definition: FormStudio.definition
    }
  }
})
</script>

<style scoped>

</style>
