<template>
  <div v-if="formModel != null">
    <PropsEditor :definition="formModel" v-on:field-change="onFieldChange">
      <PropsEditorRender :type="formModel.type" :props="formModel.props" v-on:field-change="onFieldChange"/>
    </PropsEditor>
  </div>
</template>

<script lang="ts">
import {defineComponent, getCurrentInstance, onMounted, ref} from "vue";
import PropsEditor from "@/designer/widget/PropsEditor.vue";
import PropsEditorRender from "@/designer/wrapper/PropsEditorRender.vue";
import {FormHelper} from "@/designer/helper";
import {mergeObj2Obj} from "@@/utils";


export default defineComponent({
  name: "ComponentPropsEditor",
  components: {PropsEditorRender, PropsEditor},
  setup() {
    const definition = ref<any>(null);
    const formModel = ref<any>(null);

    onMounted(() => {
      const inst = getCurrentInstance();
      FormHelper.formEditorIns = inst?.proxy;
    })


    function onFieldChange(fieldPath: string) {
      mergeObj2Obj(fieldPath,  formModel.value, definition.value)
      FormHelper.activeComponentIns!.$forceUpdate()
    }

    function setDefinition(def) {
      definition.value = def;
      formModel.value = def && JSON.parse(JSON.stringify(def))
    }

    return {
      definition,
      formModel,
      setDefinition,
      onFieldChange,
    }
  }
})
</script>

<style scoped>

</style>
