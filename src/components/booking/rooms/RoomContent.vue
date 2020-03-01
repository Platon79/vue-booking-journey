<template>
  <div class="bj-room__item-block">
    <div class="bj-room__item-gallery">
      <RoomOptionGallery :images="images" :floorplan="floorplan" :show-less-btn="false"/>
    </div>
    <div class="bj-room__item-info">
      <div class="bj-room__item-name">{{ name }}</div>
      <div class="bj-room__item-details">
        <div
          v-for="facility in facilities"
          :key="facility"
          class="bj-room__item-detail"
        >
          {{ facility }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RoomOptionGallery from '@/components/shared/RoomGallery.vue';

export default {
  components: {
    RoomOptionGallery,
  },

  props: {
    images: {
      type: Array,
      default: () => [],
    },
    floorplan: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    facilities: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
