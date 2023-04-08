<template>
  <Component :is="getComponent(type)" :props="props"/>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {DefineComponent} from "@vue/runtime-core";
import {FormHelper} from "../helper";

export default defineComponent(
    {
      name: "PropsEditorRender",
      props: {
        props: Object,
        type: String
      },
      setup() {

        function getComponent(type: string): DefineComponent {
          return FormHelper.getEditor(type)
        }

        return {
          getComponent
        }
      }
    }
)
</script>

<style scoped>

</style>
