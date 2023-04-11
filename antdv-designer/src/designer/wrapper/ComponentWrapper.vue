<template>
  <div class="component component-field" :class="{active: active}" @click="onActive">
   <span class="fm-btn-remove" v-on:click="onDelete" v-if="active">
    <CloseCircleOutlined/>
    </span>
    <div>
      <div class="field-title">
        <span>{{ title }}</span>
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

export default defineComponent({
  name: "ComponentWrapper",
  components: {
    CloseCircleOutlined
  },
  props: {
    active: Boolean,
    title: String
  },
  emits: ['onDelete', 'onActive'],
  setup(props: any, ctx: any) {

    function onDelete(e: Event) {
      e.stopPropagation();
      ctx.emit('onDelete')
    }

    function onActive(e: Event) {
      e.stopPropagation();
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
