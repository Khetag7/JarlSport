<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header  from '@/layouts/Header.vue'
import Footer  from '@/layouts/Footer.vue'

</script>

<template>
    <Header />

    <main>
        <RouterView></RouterView>
    </main>

    <Footer />
</template>

<style scoped>

</style>
