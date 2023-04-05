<template>
  <div class="component component-field" :class="{active: active}" @click="onActive">
   <span class="fm-btn-remove" v-on:click="onDelete" v-if="active">
    <CloseCircleOutlined/>
    </span>
    <div>
      <div class="field-title">
        <span>{{ definition.title }}</span>
      </div>
      <div class="field-content">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {CloseCircleOutlined} from '@ant-design/icons-vue';
import {defineComponent} from "vue";
import {DefineComponent} from "@vue/runtime-core";
import {FormHelper} from "@/designer/helper";

export default defineComponent({
  name: "ComponentWrapper",
  components: {
    CloseCircleOutlined
  },
  props: {
    active: Boolean,
    definition: Object
  },
  emits: ['onDelete', 'onActive'],
  setup(props: any, ctx: any) {

    function onDelete() {
      ctx.emit('onDelete')
    }

    function onActive() {
      ctx.emit('onActive')
    }

    return {
      onDelete,
      onActive

    }
  }
})

</script>

<style scoped>

</style>
