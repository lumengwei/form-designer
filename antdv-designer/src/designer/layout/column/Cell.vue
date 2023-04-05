<template>
  <div class="cell">
    <ComponentRender
        v-if="definition != null"
        :definition="definition"
        v-bind="$attrs"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ComponentRender from "@/designer/wrapper/ComponentRender.vue";

export default defineComponent({
  name: "Cell",
  components: {
    ComponentRender
  },
  props: {
    definition: Object
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>

</style>
