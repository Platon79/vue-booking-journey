<template>
  <div class="bj-room__item">
    <div class="bj-room__change-room">
      <button @click="showUpgradeRoomModal"><span class="icon" /> Change room</button>
    </div>

    <div class="bj-room__item-head">
      <strong>Your chosen room {{ roomNumber }} –</strong>
      {{ roomData.passengersString }}
    </div>

    <RoomContent
      :images="roomData.images"
      :floorplan="roomData.floorplan"
      :name="roomData.name"
      :facilities="roomData.facilities"
    />
  </div>
</template>

<script>
import RoomContent from './RoomContent.vue';

export default {
  components: {
    RoomContent,
  },

  props: {
    roomData: {
      type: Object,
      required: true,
    },
    roomNumber: {
      type: Number,
      required: true,
    },
  },

  methods: {
    showUpgradeRoomModal() {},
  },
};
</script>
