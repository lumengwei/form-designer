<template>
  <div v-if="definition != null">
    <PropsEditor :definition="definition">
      <PropsEditorRender :type="definition.type" :props="definition.props"/>
    </PropsEditor>
  </div>
</template>

<script lang="ts">
import {defineComponent, getCurrentInstance, onMounted, ref} from "vue";
import PropsEditor from "@/designer/widget/PropsEditor.vue";
import {ComponentDefinition} from "@@/types";
import PropsEditorRender from "@/designer/wrapper/PropsEditorRender.vue";
import {FormHelper} from "@/designer/helper";

function Definition() {
  return {} as ComponentDefinition<any>
}

export default defineComponent({
  name: "ComponentPropsEditor",
  components: {PropsEditorRender, PropsEditor},
  setup() {
    const definition = ref<any>(null);

    onMounted(() => {
      const inst = getCurrentInstance();

      FormHelper.formEditorIns = inst?.proxy;
    })

    function setDefinition(def) {
      definition.value = def;
    }

    return {
      definition,
      setDefinition
    }
  }
})
</script>

<style scoped>

</style>
