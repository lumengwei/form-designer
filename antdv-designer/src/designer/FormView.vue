<template>
  <div class="form-view" :style="{ width: formDefinition.width || 'auto' }">
    <div class="form-head" v-if="showHeader">
      <div class="form-name">{{ formDefinition.title }}</div>
      <div class="form-description">{{ formDefinition.description }}</div>
    </div>
    <div class="form-content">
      <LayoutWrapper :toolbarAble="false">
        <Component :is="getComponent(definition.type)" :definition="definition" />
      </LayoutWrapper>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, getCurrentInstance, onMounted, PropType } from 'vue';
  import { FormHelper } from './helper';
  import LayoutWrapper from './wrapper/LayoutWrapper.vue';
  import { ComponentDefinition, FormDefinition } from '@@/types';

  export default defineComponent({
    name: 'FormView',
    components: { LayoutWrapper },
    props: {
      formDefinition: {
        type: Object as PropType<FormDefinition>,
        required: true,
      },
      definition: {
        type: Object as PropType<ComponentDefinition<'LinearLayout'>>,
        required: true,
      },
      showHeader: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    setup() {
      onMounted(() => {
        const inst = getCurrentInstance();
        FormHelper.formView = inst?.proxy;
      });

      function getComponent(type: string) {
        return FormHelper.getComponent(type);
      }

      return {
        getComponent,
      };
    },
  });
</script>

<style scoped></style>
