<template>
  <div class="form-view" :style="{width: formDefinition.width || '778px'}">
    <div class="form-head">
      <div class="form-name">{{ formDefinition.title }}</div>
      <div class="form-description">{{ formDefinition.description }}</div>
    </div>
    <div class="form-content">
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "FormView",
  props: {
    formDefinition: Object
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>

</style>
