<template>
  <div class="bj">
    <header class="header">
      <Navigation />
    </header>
    <main class="bj-wrap">
      <div class="bj-content">
        <router-view />
      </div>
      <div class="bj-sidebar">
        <Sidebar />
      </div>
    </main>
  </div>
</template>

<script>
import Navigation from './Nav.vue';
import Sidebar from './Sidebar.vue';

export default {
  components: {
    Navigation,
    Sidebar,
  },
};
</script>
