<template>
  <div style="padding-top: 100px">
    <Input v-model="val" type="text" placeholder="Test" />
  </div>
</template>

<script>
import Input from '@/components/shared/Input.vue';

export default {
  components: {
    Input,
  },

  data: () => ({
    val: '',
  }),
};
</script>
