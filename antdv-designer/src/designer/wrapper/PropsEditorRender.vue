<template>
  <Component :is="getComponent(type)" :props="props" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { DefineComponent } from '@vue/runtime-core';
  import { FormHelper } from '../helper';
  export default defineComponent({
    name: 'PropsEditorRender',
    props: {
      props: Object,
      type: {
        type: String,
        required: true,
      },
    },
    setup() {
      function getComponent(type: string): DefineComponent {
        const editor = FormHelper.getEditor(type);
        return editor;
      }

      return {
        getComponent,
      };
    },
  });
</script>

<style scoped></style>
