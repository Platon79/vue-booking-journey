<template>
  <div class="room-gallery">
    <Slider
      v-model="sliderIndex"
      :autoplay="false"
      :control-btn="showGalleryControlButton"
      animation="normal"
      indicators="center"
      height="100%"
    >
      <slider-item v-for="(i, index) in validImages" :key="index">
        <div
          :style="{
            backgroundImage: 'url(' + i.replace('neilson.test:8080', 'neilson.co.uk') + ')',
            backgroundSize: isFloorPlan(index) ? 'contain' : 'cover'
          }"
          class="slider-item__image"
        />
      </slider-item>
    </Slider>
    <span
      v-if="sliderIndex !== floorplanIndex"
      :class="floorplan ? 'pointer': 'gallery__floorplan--disabled'"
      class="gallery__floorplan"
      @click="goToFloorplan"
    >
      {{ floorplan ? 'See floor plan' : 'No floor plan' }}
    </span>
    <span
      v-if="showLessBtn && !mqLessThan('md')"
      class="more-info pointer"
      @click="handleMoreInfoClick"
    >
      Less details <span class="caret caret__open" />
    </span>
  </div>
</template>

<script>
import { Slider, SliderItem } from 'vue-easy-slider';

export default {
  components: {
    Slider,
    SliderItem,
  },

  props: {
    // Floorplan image URL.
    floorplan: {
      type: String,
      default: '',
    },
    // Array of room images URLs.
    images: {
      type: Array,
      required: true,
    },
    showLessBtn: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    sliderIndex: 0,
  }),

  computed: {
    showGalleryControlButton() {
      return this.validImages.length > 1;
    },
    validImages() {
      const myValidImages = this.images.length ? [...this.images] : [defaultImage];

      // Floorplan will be last element in array.
      if (this.floorplan) {
        myValidImages.push(this.floorplan);
      }
      return myValidImages;
    },
    floorplanIndex() {
      return this.validImages.length - 1;
    },
  },

  methods: {
    goToFloorplan() {
      if (this.floorplan) {
        this.sliderIndex = this.validImages.length - 1;
      }
    },

    isFloorPlan(index) {
      return (this.floorplan && index === this.validImages.length - 1);
    },
  },
};
</script>
