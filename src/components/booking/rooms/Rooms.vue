<template>
  <div class="bj-room">
    <h1 class="bj__h1">Rooms</h1>

    <div class="bj-room__list">
      <RoomItem
        v-for="(room, index) in draftRoomsDetails"
        :key="room.id"
        :room-data="room"
        :room-number="index + 1"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RoomItem from './RoomItem.vue';

export default {
  components: {
    RoomItem,
  },

  computed: {
    ...mapGetters('bookingJourney/rooms', [
      'draftRoomsDetails',
    ]),
  },
};
</script>
